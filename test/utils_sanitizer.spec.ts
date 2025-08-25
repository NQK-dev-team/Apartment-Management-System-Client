import { expect, describe, it } from 'vitest';
import { sanitizeString } from '../utils/sanitizer';

describe('sanitizeString', () => {
  describe('Allowed HTML Tags', () => {
    it('preserves allowed basic HTML tags', () => {
      const input = '<p>Hello <strong>world</strong>!</p>';
      const result = sanitizeString(input);
      expect(result).toBe('<p>Hello <strong>world</strong>!</p>');
    });

    it('preserves allowed structural tags', () => {
      const input = '<div><header><h1>Title</h1></header><main><section><article>Content</article></section></main></div>';
      const result = sanitizeString(input);
      expect(result).toBe('<div><header><h1>Title</h1></header><main><section><article>Content</article></section></main></div>');
    });

    it('preserves allowed list tags', () => {
      const input = '<ul><li>Item 1</li><li>Item 2</li></ul><ol><li>First</li><li>Second</li></ol>';
      const result = sanitizeString(input);
      expect(result).toBe('<ul><li>Item 1</li><li>Item 2</li></ul><ol><li>First</li><li>Second</li></ol>');
    });

    it('preserves allowed table tags', () => {
      const input = '<table><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Data</td></tr></tbody></table>';
      const result = sanitizeString(input);
      expect(result).toBe('<table><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Data</td></tr></tbody></table>');
    });

    it('preserves allowed inline formatting tags', () => {
      const input = '<em>emphasized</em> <i>italic</i> <b>bold</b> <code>code</code> <small>small</small>';
      const result = sanitizeString(input);
      expect(result).toBe('<em>emphasized</em> <i>italic</i> <b>bold</b> <code>code</code> <small>small</small>');
    });
  });

  describe('Disallowed HTML Tags', () => {
    it('removes script tags and content', () => {
      const input = '<p>Safe content</p><script>alert("xss")</script>';
      const result = sanitizeString(input);
      expect(result).toBe('<p>Safe content</p>');
      expect(result).not.toContain('script');
      expect(result).not.toContain('alert');
    });

    it('removes style tags and content', () => {
      const input = '<p>Content</p><style>body { background: red; }</style>';
      const result = sanitizeString(input);
      expect(result).toBe('<p>Content</p>');
      expect(result).not.toContain('style');
      expect(result).not.toContain('background');
    });

    it('removes form-related tags', () => {
      const input = '<form><input type="text"><button>Submit</button></form>';
      const result = sanitizeString(input);
      expect(result).toBe('Submit');
      expect(result).not.toContain('form');
      expect(result).not.toContain('input');
      expect(result).not.toContain('button');
    });

    it('removes iframe tags', () => {
      const input = '<p>Content</p><iframe src="https://evil.com"></iframe>';
      const result = sanitizeString(input);
      expect(result).toBe('<p>Content</p>');
      expect(result).not.toContain('iframe');
    });

    it('removes object and embed tags', () => {
      const input = '<p>Content</p><object data="file.swf"></object><embed src="file.swf">';
      const result = sanitizeString(input);
      expect(result).toBe('<p>Content</p>');
      expect(result).not.toContain('object');
      expect(result).not.toContain('embed');
    });
  });

  describe('Allowed Attributes', () => {
    it('preserves allowed link attributes', () => {
      const input = '<a href="https://example.com" target="_blank">Link</a>';
      const result = sanitizeString(input);
      expect(result).toBe('<a href="https://example.com" target="_blank">Link</a>');
    });

    it('preserves allowed image attributes', () => {
      const input = '<img src="image.jpg" alt="Description" width="100" height="50" loading="lazy">';
      const result = sanitizeString(input);
      expect(result).toBe('<img src="image.jpg" alt="Description" width="100" height="50" loading="lazy" />');
    });

    it('removes disallowed attributes from allowed tags', () => {
      const input = '<p onclick="alert(1)" class="safe" data-unsafe="remove">Content</p>';
      const result = sanitizeString(input);
      expect(result).toBe('<p>Content</p>');
      expect(result).not.toContain('onclick');
      expect(result).not.toContain('class');
      expect(result).not.toContain('data-unsafe');
    });

    it('removes event handler attributes', () => {
      const input = '<div onmouseover="alert(1)" onload="malicious()">Content</div>';
      const result = sanitizeString(input);
      expect(result).toBe('<div>Content</div>');
      expect(result).not.toContain('onmouseover');
      expect(result).not.toContain('onload');
    });
  });

  describe('URL Schemes', () => {
    it('allows safe URL schemes in href', () => {
      const input = '<a href="https://example.com">HTTPS</a><a href="http://example.com">HTTP</a><a href="mailto:test@example.com">Email</a>';
      const result = sanitizeString(input);
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('href="http://example.com"');
      expect(result).toContain('href="mailto:test@example.com"');
    });

    it('allows tel and ftp schemes', () => {
      const input = '<a href="tel:+1234567890">Phone</a><a href="ftp://files.example.com">FTP</a>';
      const result = sanitizeString(input);
      expect(result).toContain('href="tel:+1234567890"');
      expect(result).toContain('href="ftp://files.example.com"');
    });

    it('removes dangerous URL schemes', () => {
      const input = '<a href="javascript:alert(1)">Malicious</a><a href="data:text/html,<script>alert(1)</script>">Data URL</a>';
      const result = sanitizeString(input);
      expect(result).not.toContain('javascript:');
      expect(result).not.toContain('data:');
      // Links should still exist but without href
      expect(result).toContain('Malicious');
      expect(result).toContain('Data URL');
    });

    it('allows protocol-relative URLs', () => {
      const input = '<a href="//example.com/path">Protocol relative</a>';
      const result = sanitizeString(input);
      expect(result).toContain('href="//example.com/path"');
    });
  });

  describe('XSS Prevention', () => {
    it('prevents script injection in attributes', () => {
      const input = '<img src="x" onerror="alert(1)">';
      const result = sanitizeString(input);
      expect(result).toBe('<img src="x" />');
      expect(result).not.toContain('onerror');
      expect(result).not.toContain('alert');
    });

    it('prevents javascript URLs', () => {
      const input = '<a href="javascript:void(0)">Click me</a>';
      const result = sanitizeString(input);
      expect(result).not.toContain('javascript:');
      expect(result).toContain('Click me');
    });

    it('prevents data URI XSS', () => {
      const input = '<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">Encoded XSS</a>';
      const result = sanitizeString(input);
      expect(result).not.toContain('data:');
      expect(result).toContain('Encoded XSS');
    });

    it('handles malformed HTML gracefully', () => {
      const input = '<p>Unclosed paragraph<div>Nested without closing</p>';
      const result = sanitizeString(input);
      expect(result).toContain('Unclosed paragraph');
      expect(result).toContain('Nested without closing');
    });
  });

  describe('Self-Closing Tags', () => {
    it('handles self-closing tags correctly', () => {
      const input = '<p>Line 1<br>Line 2<hr>Line 3</p>';
      const result = sanitizeString(input);
      expect(result).toBe('<p>Line 1<br />Line 2</p><hr />Line 3<p></p>');
    });

    it('handles img as self-closing', () => {
      const input = '<img src="test.jpg" alt="Test">';
      const result = sanitizeString(input);
      expect(result).toBe('<img src="test.jpg" alt="Test" />');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string', () => {
      expect(sanitizeString('')).toBe('');
    });

    it('handles plain text without HTML', () => {
      const input = 'Just plain text with no HTML tags.';
      const result = sanitizeString(input);
      expect(result).toBe('Just plain text with no HTML tags.');
    });

    it('handles only whitespace', () => {
      const input = '   \n\t   ';
      const result = sanitizeString(input);
      expect(result).toBe('   \n\t   ');
    });

    it('handles special characters', () => {
      const input = '<p>Special chars: &amp; &lt; &gt; &quot;</p>';
      const result = sanitizeString(input);
      expect(result).toBe('<p>Special chars: &amp; &lt; &gt; "</p>');
    });

    it('handles Unicode characters', () => {
      const input = '<p>Unicode: 🎉 你好 مرحبا Здравствуй</p>';
      const result = sanitizeString(input);
      expect(result).toBe('<p>Unicode: 🎉 你好 مرحبا Здравствуй</p>');
    });

    it('handles nested tags properly', () => {
      const input = '<div><p><strong><em>Deeply nested text</em></strong></p></div>';
      const result = sanitizeString(input);
      expect(result).toBe('<div><p><strong><em>Deeply nested text</em></strong></p></div>');
    });

    it('preserves text content when removing tags', () => {
      const input = '<script>alert("xss")</script>Keep this text<style>body{}</style>';
      const result = sanitizeString(input);
      expect(result).toBe('Keep this text');
    });
  });

  describe('Real-world Examples', () => {
    it('handles typical blog post content', () => {
      const input = `
        <article>
          <header>
            <h1>Blog Post Title</h1>
            <time datetime="2023-12-25">December 25, 2023</time>
          </header>
          <main>
            <p>This is a <strong>blog post</strong> with <a href="https://example.com">links</a>.</p>
            <blockquote cite="https://example.com">
              <p>This is a quote from somewhere.</p>
            </blockquote>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </main>
        </article>
      `;
      const result = sanitizeString(input);
      
      expect(result).toContain('<article>');
      expect(result).toContain('<h1>Blog Post Title</h1>');
      expect(result).toContain('<strong>blog post</strong>');
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('<blockquote');
      expect(result).toContain('<ul>');
      expect(result).toContain('<li>');
    });

    it('handles mixed malicious and safe content', () => {
      const input = `
        <p>Safe paragraph</p>
        <script>alert('xss')</script>
        <div>
          <a href="javascript:void(0)">Malicious link</a>
          <a href="https://safe.com">Safe link</a>
        </div>
        <img src="image.jpg" onerror="alert(1)" alt="Image">
      `;
      const result = sanitizeString(input);
      
      expect(result).toContain('<p>Safe paragraph</p>');
      expect(result).not.toContain('script');
      expect(result).not.toContain('alert');
      expect(result).not.toContain('javascript:');
      expect(result).toContain('href="https://safe.com"');
      expect(result).toContain('Malicious link'); // Text preserved
      expect(result).toContain('Safe link');
      expect(result).toContain('<img src="image.jpg"');
      expect(result).not.toContain('onerror');
    });
  });
});