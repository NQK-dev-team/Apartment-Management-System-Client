import { expect, describe, it, vi } from 'vitest';
import { getRoleFromJWT, getUserNameFromJWT, getUserImageFromJWT, getUserIDFromJWT, getUserNoFromJWT } from '../../utils/jwt';

describe('JWT Utility Functions', () => {
  // Helper function to create a mock JWT token
  const createMockJWT = (payload: any): string => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = 'mock-signature';
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  };

  describe('getRoleFromJWT', () => {
    it('returns 111 for user with all roles', () => {
      const payload = {
        isOwner: true,
        isManager: true,
        isCustomer: true,
        fullName: 'John Doe',
        userID: '123',
        userNo: 'USER001'
      };
      const token = createMockJWT(payload);
      expect(getRoleFromJWT(token)).toBe('111');
    });

    it('returns 100 for owner only', () => {
      const payload = {
        isOwner: true,
        isManager: false,
        isCustomer: false
      };
      const token = createMockJWT(payload);
      expect(getRoleFromJWT(token)).toBe('100');
    });

    it('returns 010 for manager only', () => {
      const payload = {
        isOwner: false,
        isManager: true,
        isCustomer: false
      };
      const token = createMockJWT(payload);
      expect(getRoleFromJWT(token)).toBe('010');
    });

    it('returns 001 for customer only', () => {
      const payload = {
        isOwner: false,
        isManager: false,
        isCustomer: true
      };
      const token = createMockJWT(payload);
      expect(getRoleFromJWT(token)).toBe('001');
    });

    it('returns 000 for user with no roles', () => {
      const payload = {
        isOwner: false,
        isManager: false,
        isCustomer: false
      };
      const token = createMockJWT(payload);
      expect(getRoleFromJWT(token)).toBe('000');
    });

    it('handles missing role properties as false', () => {
      const payload = {
        fullName: 'John Doe',
        userID: '123'
      };
      const token = createMockJWT(payload);
      expect(getRoleFromJWT(token)).toBe('000');
    });

    it('returns empty string for empty token', () => {
      expect(getRoleFromJWT('')).toBe('');
    });

    it('returns empty string for null token', () => {
      expect(getRoleFromJWT(null as any)).toBe('');
    });

    it('returns empty string for undefined token', () => {
      expect(getRoleFromJWT(undefined as any)).toBe('');
    });
  });

  describe('getUserNameFromJWT', () => {
    it('returns full name from JWT payload', () => {
      const payload = {
        fullName: 'John Doe Smith',
        isOwner: true,
        userID: '123'
      };
      const token = createMockJWT(payload);
      expect(getUserNameFromJWT(token)).toBe('John Doe Smith');
    });

    it('returns full name with special characters', () => {
      const payload = {
        fullName: 'Nguyễn Văn A',
        isOwner: false
      };
      const token = createMockJWT(payload);
      expect(getUserNameFromJWT(token)).toBe('Nguyễn Văn A');
    });

    it('returns undefined when fullName is not in payload', () => {
      const payload = {
        isOwner: true,
        userID: '123'
      };
      const token = createMockJWT(payload);
      expect(getUserNameFromJWT(token)).toBeUndefined();
    });

    it('returns empty string for empty token', () => {
      expect(getUserNameFromJWT('')).toBe('');
    });

    it('returns empty string for null token', () => {
      expect(getUserNameFromJWT(null as any)).toBe('');
    });
  });

  describe('getUserImageFromJWT', () => {
    it('returns image path from JWT payload', () => {
      const payload = {
        imagePath: '/uploads/profile/user123.jpg',
        fullName: 'John Doe',
        userID: '123'
      };
      const token = createMockJWT(payload);
      expect(getUserImageFromJWT(token)).toBe('/uploads/profile/user123.jpg');
    });

    it('returns full URL image path', () => {
      const payload = {
        imagePath: 'https://example.com/images/profile.png',
        fullName: 'Jane Doe'
      };
      const token = createMockJWT(payload);
      expect(getUserImageFromJWT(token)).toBe('https://example.com/images/profile.png');
    });

    it('returns undefined when imagePath is not in payload', () => {
      const payload = {
        fullName: 'John Doe',
        userID: '123'
      };
      const token = createMockJWT(payload);
      expect(getUserImageFromJWT(token)).toBeUndefined();
    });

    it('returns empty string for empty token', () => {
      expect(getUserImageFromJWT('')).toBe('');
    });

    it('returns empty string for null token', () => {
      expect(getUserImageFromJWT(null as any)).toBe('');
    });
  });

  describe('getUserIDFromJWT', () => {
    it('returns user ID from JWT payload', () => {
      const payload = {
        userID: '12345',
        fullName: 'John Doe',
        isOwner: true
      };
      const token = createMockJWT(payload);
      expect(getUserIDFromJWT(token)).toBe('12345');
    });

    it('returns numeric user ID as string', () => {
      const payload = {
        userID: 67890,
        fullName: 'Jane Doe'
      };
      const token = createMockJWT(payload);
      expect(getUserIDFromJWT(token)).toBe(67890);
    });

    it('returns UUID format user ID', () => {
      const payload = {
        userID: '550e8400-e29b-41d4-a716-446655440000',
        fullName: 'Bob Smith'
      };
      const token = createMockJWT(payload);
      expect(getUserIDFromJWT(token)).toBe('550e8400-e29b-41d4-a716-446655440000');
    });

    it('returns undefined when userID is not in payload', () => {
      const payload = {
        fullName: 'John Doe',
        isOwner: true
      };
      const token = createMockJWT(payload);
      expect(getUserIDFromJWT(token)).toBeUndefined();
    });

    it('returns empty string for empty token', () => {
      expect(getUserIDFromJWT('')).toBe('');
    });

    it('returns empty string for null token', () => {
      expect(getUserIDFromJWT(null as any)).toBe('');
    });
  });

  describe('getUserNoFromJWT', () => {
    it('returns user number from JWT payload', () => {
      const payload = {
        userNo: 'USER001',
        fullName: 'John Doe',
        userID: '123'
      };
      const token = createMockJWT(payload);
      expect(getUserNoFromJWT(token)).toBe('USER001');
    });

    it('returns numeric user number', () => {
      const payload = {
        userNo: 'EMP12345',
        fullName: 'Jane Doe'
      };
      const token = createMockJWT(payload);
      expect(getUserNoFromJWT(token)).toBe('EMP12345');
    });

    it('returns user number with special format', () => {
      const payload = {
        userNo: 'CUST-2023-001',
        fullName: 'Bob Smith'
      };
      const token = createMockJWT(payload);
      expect(getUserNoFromJWT(token)).toBe('CUST-2023-001');
    });

    it('returns undefined when userNo is not in payload', () => {
      const payload = {
        fullName: 'John Doe',
        userID: '123'
      };
      const token = createMockJWT(payload);
      expect(getUserNoFromJWT(token)).toBeUndefined();
    });

    it('returns empty string for empty token', () => {
      expect(getUserNoFromJWT('')).toBe('');
    });

    it('returns empty string for null token', () => {
      expect(getUserNoFromJWT(null as any)).toBe('');
    });
  });

  describe('Error Handling', () => {
    it('handles malformed JWT tokens gracefully', () => {
      const malformedToken = 'not.a.valid.jwt';
      
      expect(() => getRoleFromJWT(malformedToken)).toThrow();
      expect(() => getUserNameFromJWT(malformedToken)).toThrow();
      expect(() => getUserImageFromJWT(malformedToken)).toThrow();
      expect(() => getUserIDFromJWT(malformedToken)).toThrow();
      expect(() => getUserNoFromJWT(malformedToken)).toThrow();
    });

    it('handles invalid base64 payload', () => {
      const invalidToken = 'header.invalid-base64.signature';
      
      expect(() => getRoleFromJWT(invalidToken)).toThrow();
      expect(() => getUserNameFromJWT(invalidToken)).toThrow();
      expect(() => getUserImageFromJWT(invalidToken)).toThrow();
      expect(() => getUserIDFromJWT(invalidToken)).toThrow();
      expect(() => getUserNoFromJWT(invalidToken)).toThrow();
    });

    it('handles invalid JSON in payload', () => {
      const header = Buffer.from(JSON.stringify({ alg: 'HS256' })).toString('base64url');
      const invalidPayload = Buffer.from('invalid-json').toString('base64url');
      const signature = 'signature';
      const invalidToken = `${header}.${invalidPayload}.${signature}`;
      
      expect(() => getRoleFromJWT(invalidToken)).toThrow();
      expect(() => getUserNameFromJWT(invalidToken)).toThrow();
      expect(() => getUserImageFromJWT(invalidToken)).toThrow();
      expect(() => getUserIDFromJWT(invalidToken)).toThrow();
      expect(() => getUserNoFromJWT(invalidToken)).toThrow();
    });
  });

  describe('Integration Tests', () => {
    it('extracts all user information from complete JWT', () => {
      const payload = {
        userID: '12345',
        userNo: 'USER001',
        fullName: 'John Doe Smith',
        imagePath: '/uploads/profile/user123.jpg',
        isOwner: true,
        isManager: false,
        isCustomer: true,
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        iat: Math.floor(Date.now() / 1000)
      };
      const token = createMockJWT(payload);

      expect(getRoleFromJWT(token)).toBe('101');
      expect(getUserNameFromJWT(token)).toBe('John Doe Smith');
      expect(getUserImageFromJWT(token)).toBe('/uploads/profile/user123.jpg');
      expect(getUserIDFromJWT(token)).toBe('12345');
      expect(getUserNoFromJWT(token)).toBe('USER001');
    });

    it('handles minimal JWT payload', () => {
      const payload = {
        userID: '999'
      };
      const token = createMockJWT(payload);

      expect(getRoleFromJWT(token)).toBe('000');
      expect(getUserNameFromJWT(token)).toBeUndefined();
      expect(getUserImageFromJWT(token)).toBeUndefined();
      expect(getUserIDFromJWT(token)).toBe('999');
      expect(getUserNoFromJWT(token)).toBeUndefined();
    });
  });
});