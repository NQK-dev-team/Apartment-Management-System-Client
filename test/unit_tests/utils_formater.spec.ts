import { expect, describe, it, vi, beforeEach } from 'vitest';
import { formatPrice, convertToDate, convertToDateTime, convertToMonthYear, convertToDateTime2 } from '../../utils/formatter';

// Mock the COMMON constants since they're imported from Nuxt aliases
const COMMON = {
  LOCALE: {
    VI: 'vi',
    EN: 'en',
    VI_FULL: 'vi-VN',
    EN_FULL: 'en-US',
  },
};

// Mock the COMMON import
vi.mock('~/consts/common', () => ({
  COMMON: {
    LOCALE: {
      VI: 'vi',
      EN: 'en',
      VI_FULL: 'vi-VN',
      EN_FULL: 'en-US',
    },
  },
}));

describe('formatPrice', () => {
  it('formats positive price correctly', () => {
    const result = formatPrice(1000000);
    expect(result).toMatch(/1,000,000/); // Vietnamese number format
    expect(result).toMatch(/₫/); // VND symbol
  });

  it('formats zero price', () => {
    const result = formatPrice(0);
    expect(result).toMatch(/0/);
    expect(result).toMatch(/₫/);
  });

  it('formats negative price', () => {
    const result = formatPrice(-500000);
    expect(result).toMatch(/-₫500,000/);
  });

  it('formats decimal price', () => {
    const result = formatPrice(1234.56);
    expect(result).toMatch(/1,235/); // Should round to nearest VND
    expect(result).toMatch(/₫/);
  });

  it('formats large numbers', () => {
    const result = formatPrice(1000000000);
    expect(result).toMatch(/1,000,000,000/);
    expect(result).toMatch(/₫/);
  });

  it('formats small decimal numbers', () => {
    const result = formatPrice(123.45);
    expect(result).toMatch(/123/);
    expect(result).toMatch(/₫/);
  });
});

describe('convertToDate', () => {
  it('converts valid date string to YYYY-MM-DD format', () => {
    expect(convertToDate('2023-12-25T10:30:00Z')).toBe('2023-12-25');
    expect(convertToDate('2023-01-01T00:00:00Z')).toBe('2023-01-01');
    expect(convertToDate('2023-06-15T15:45:30Z')).toBe('2023-06-15');
  });

  it('handles different date formats', () => {
    expect(convertToDate('December 25, 2023')).toBe('2023-12-25');
    expect(convertToDate('2023/12/25')).toBe('2023-12-25');
    expect(convertToDate('12/25/2023')).toBe('2023-12-25');
  });

  it('pads single digit months and days with zero', () => {
    expect(convertToDate('2023-01-05T10:00:00Z')).toBe('2023-01-05');
    expect(convertToDate('2023-09-09T10:00:00Z')).toBe('2023-09-09');
  });

  it('returns empty string for empty input', () => {
    expect(convertToDate('')).toBe('');
  });

  it('returns empty string for null/undefined input', () => {
    expect(convertToDate(null as any)).toBe('');
    expect(convertToDate(undefined as any)).toBe('');
  });

  it('handles leap year dates', () => {
    expect(convertToDate('2024-02-29T12:00:00Z')).toBe('2024-02-29');
  });

  it('handles edge of year dates', () => {
    expect(convertToDate('2024-01-01T00:00:01Z')).toBe('2024-01-01');
  });
});

describe('convertToMonthYear', () => {
  it('converts date to YYYY-MM format', () => {
    expect(convertToMonthYear('2023-12-25T10:30:00Z')).toBe('2023-12');
    expect(convertToMonthYear('2023-01-15T00:00:00Z')).toBe('2023-01');
    expect(convertToMonthYear('2023-06-30T12:00:00Z')).toBe('2023-06');
  });

  it('pads single digit months with zero', () => {
    expect(convertToMonthYear('2023-01-01T10:00:00Z')).toBe('2023-01');
    expect(convertToMonthYear('2023-09-15T10:00:00Z')).toBe('2023-09');
  });

  it('handles different date formats', () => {
    expect(convertToMonthYear('December 25, 2023')).toBe('2023-12');
    expect(convertToMonthYear('2023/01/15')).toBe('2023-01');
  });

  it('handles edge months', () => {
    expect(convertToMonthYear('2023-01-01T00:00:00Z')).toBe('2023-01');
    expect(convertToMonthYear('2023-12-31T23:59:59Z')).toBe('2024-01');
  });
});

describe('convertToDateTime', () => {
  it('converts date to YYYY-MM-DD HH:mm:ss format', () => {
    expect(convertToDateTime('2023-12-25T10:30:45Z')).toBe('2023-12-25 10:30:45');
    expect(convertToDateTime('2023-01-01T00:00:00Z')).toBe('2023-01-01 00:00:00');
    expect(convertToDateTime('2023-06-15T23:59:59Z')).toBe('2023-06-15 23:59:59');
  });

  it('pads single digit values with zero', () => {
    expect(convertToDateTime('2023-01-05T09:05:05Z')).toBe('2023-01-05 09:05:05');
    expect(convertToDateTime('2023-09-09T01:01:01Z')).toBe('2023-09-09 01:01:01');
  });

  it('handles noon and midnight', () => {
    expect(convertToDateTime('2023-06-15T12:00:00Z')).toBe('2023-06-15 12:00:00');
    expect(convertToDateTime('2023-06-15T00:00:00Z')).toBe('2023-06-15 00:00:00');
  });

  it('handles different time zones (converts to local)', () => {
    // Note: This test might vary based on system timezone
    const result = convertToDateTime('2023-12-25T10:30:45+07:00');
    expect(result).toMatch(/2023-12-25 \d{2}:\d{2}:\d{2}/);
  });

  it('handles various date input formats', () => {
    expect(convertToDateTime('December 25, 2023 10:30:45')).toMatch(/2023-12-25 \d{2}:\d{2}:\d{2}/);
  });
});

