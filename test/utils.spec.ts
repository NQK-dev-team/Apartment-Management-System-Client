import { expect, describe, it } from 'vitest';
import { getFileSizeString } from '../utils/common';

describe('getFileSizeString', () => {
  it('returns bytes for small numbers', () => {
    expect(getFileSizeString(512)).toBe('512.00 B');
  });
  it('returns KiB for kilobytes', () => {
    expect(getFileSizeString(2048)).toBe('2.00 KiB');
  });
  it('returns MiB for megabytes', () => {
    expect(getFileSizeString(1048576)).toBe('1.00 MiB');
  });
});