import { expect, describe, it, vi } from 'vitest';
import { removeDiacritics } from '../../utils/diacritics';
import { getBase64 } from '../../utils/image';

describe('removeDiacritics', () => {
  it('removes Vietnamese diacritics', () => {
    expect(removeDiacritics('Nguyễn')).toBe('Nguyen');
    expect(removeDiacritics('Trần')).toBe('Tran');
    expect(removeDiacritics('Đặng')).toBe('Đang');
    expect(removeDiacritics('Phạm')).toBe('Pham');
  });

  it('removes French diacritics', () => {
    expect(removeDiacritics('café')).toBe('cafe');
    expect(removeDiacritics('naïve')).toBe('naive');
    expect(removeDiacritics('résumé')).toBe('resume');
    expect(removeDiacritics('François')).toBe('Francois');
  });

  it('removes Spanish diacritics', () => {
    expect(removeDiacritics('niño')).toBe('nino');
    expect(removeDiacritics('mañana')).toBe('manana');
    expect(removeDiacritics('José')).toBe('Jose');
    expect(removeDiacritics('Señor')).toBe('Senor');
  });

  it('removes German diacritics', () => {
    expect(removeDiacritics('Müller')).toBe('Muller');
    expect(removeDiacritics('Café')).toBe('Cafe');
    expect(removeDiacritics('naïf')).toBe('naif');
  });

  it('handles mixed diacritics in one string', () => {
    expect(removeDiacritics('Café Señoría Müller')).toBe('Cafe Senoria Muller');
    expect(removeDiacritics('Hà Nội, Việt Nam')).toBe('Ha Noi, Viet Nam');
  });

  it('returns unchanged string without diacritics', () => {
    expect(removeDiacritics('Hello World')).toBe('Hello World');
    expect(removeDiacritics('123456')).toBe('123456');
    expect(removeDiacritics('Test123')).toBe('Test123');
  });

  it('handles empty string', () => {
    expect(removeDiacritics('')).toBe('');
  });

  it('handles string with only spaces', () => {
    expect(removeDiacritics('   ')).toBe('   ');
  });

  it('handles special characters and punctuation', () => {
    expect(removeDiacritics('Café, Niño & François!')).toBe('Cafe, Nino & Francois!');
    expect(removeDiacritics('@#$%^&*()')).toBe('@#$%^&*()');
  });

  it('preserves capitalization', () => {
    expect(removeDiacritics('CAFÉ')).toBe('CAFE');
    expect(removeDiacritics('Café')).toBe('Cafe');
    expect(removeDiacritics('café')).toBe('cafe');
  });
});
