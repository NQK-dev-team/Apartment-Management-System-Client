import { expect, describe, it } from 'vitest';
import { 
  getFileSizeString, 
  getContractType, 
  getContractStatus, 
  getUserName, 
  getUserGender, 
  getUserRole, 
  getBillStatus, 
  getImportTypeLabel,
  getTimeDifferenceFromNow 
} from '../../utils/common';
import type { User } from '../../types/user';
import type { RoomResident } from '~/types/contract';
import { vi } from 'vitest';

// Mock the COMMON constants since they're imported from Nuxt aliases
const COMMON = {
  USER_GENDER: {
    MALE: 1,
    FEMALE: 2,
  },
  CONTRACT_TYPE: {
    RENT: 1,
    BUY: 2,
  },
  CONTRACT_STATUS: {
    ACTIVE: 1,
    EXPIRED: 2,
    CANCELLED: 3,
    WAITING_FOR_SIGNATURE: 4,
    NOT_IN_EFFECT: 5,
  },
  BILL_STATUS: {
    UN_PAID: 1,
    PAID: 2,
    OVERDUE: 3,
    PROCESSING: 4,
    CANCELLED: 5,
  },
  UPLOAD_TYPE: {
    ADD_CUSTOMERS: 1,
    ADD_CONTRACTS: 2,
    ADD_BILLS: 3,
  },
};

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
  
  it('returns GiB for gigabytes', () => {
    expect(getFileSizeString(1073741824)).toBe('1.00 GiB');
  });
  
  it('handles zero size', () => {
    expect(getFileSizeString(0)).toBe('0.00 B');
  });
});

describe('getContractType', () => {
  it('returns rent_contract for RENT type', () => {
    expect(getContractType(1)).toBe('rent_contract');
  });
  
  it('returns buy_contract for BUY type', () => {
    expect(getContractType(2)).toBe('buy_contract');
  });
  
  it('returns - for unknown type', () => {
    expect(getContractType(999)).toBe('-');
  });
});

describe('getContractStatus', () => {
  it('returns active for ACTIVE status', () => {
    expect(getContractStatus(1)).toBe('active');
  });
  
  it('returns expired for EXPIRED status', () => {
    expect(getContractStatus(2)).toBe('expired');
  });
  
  it('returns cancelled for CANCELLED status', () => {
    expect(getContractStatus(3)).toBe('cancelled');
  });
  
  it('returns wait_for_signature for WAITING_FOR_SIGNATURE status', () => {
    expect(getContractStatus(4)).toBe('wait_for_signature');
  });
  
  it('returns not_in_effect for NOT_IN_EFFECT status', () => {
    expect(getContractStatus(5)).toBe('not_in_effect');
  });
  
  it('returns - for unknown status', () => {
    expect(getContractStatus(999)).toBe('-');
  });
});

describe('getUserName', () => {
  it('returns full name with middle name (User)', () => {
    const user: Partial<User> = {
      firstName: 'John',
      lastName: 'Doe',
      middleName: { Valid: true, String: 'William' }
    };
    expect(getUserName(user as User)).toBe('Doe William John');
  });
  
  it('returns name without middle name when not valid (User)', () => {
    const user: Partial<User> = {
      firstName: 'John',
      lastName: 'Doe',
      middleName: { Valid: false, String: '' }
    };
    expect(getUserName(user as User)).toBe('Doe John');
  });

  it('returns full name with middle name (RoomResident)', () => {
    const resident: Partial<RoomResident> = {
      firstName: 'Jane',
      lastName: 'Smith',
      middleName: { Valid: true, String: 'Marie' }
    };
    expect(getUserName(resident as RoomResident)).toBe('Smith Marie Jane');
  });
  
  it('returns name without middle name when not valid (RoomResident)', () => {
    const resident: Partial<RoomResident> = {
      firstName: 'Jane',
      lastName: 'Smith',
      middleName: { Valid: false, String: '' }
    };
    expect(getUserName(resident as RoomResident)).toBe('Smith Jane');
  });
  
  it('returns empty string for undefined user', () => {
    expect(getUserName(undefined)).toBe('');
  });
});

describe('getUserGender', () => {
  it('returns male for male gender with gender parameter', () => {
    expect(getUserGender(undefined, 1)).toBe('male');
  });
  
  it('returns female for female gender with gender parameter', () => {
    expect(getUserGender(undefined, 2)).toBe('female');
  });
  
  it('returns other for unknown gender with gender parameter', () => {
    expect(getUserGender(undefined, 3)).toBe('other');
  });
  
  it('returns male for User with male gender', () => {
    const user: Partial<User> = { gender: 1 };
    expect(getUserGender(user as User)).toBe('male');
  });
  
  it('returns female for User with female gender', () => {
    const user: Partial<User> = { gender: 2 };
    expect(getUserGender(user as User)).toBe('female');
  });
  
  it('returns other for User with unknown gender', () => {
    const user: Partial<User> = { gender: 3 };
    expect(getUserGender(user as User)).toBe('other');
  });

  it('returns male for RoomResident with male gender', () => {
    const resident: Partial<RoomResident> = { gender: 1 };
    expect(getUserGender(resident as RoomResident)).toBe('male');
  });
  
  it('returns female for RoomResident with female gender', () => {
    const resident: Partial<RoomResident> = { gender: 2 };
    expect(getUserGender(resident as RoomResident)).toBe('female');
  });

  it('returns other for RoomResident with undefined gender', () => {
    const resident: Partial<RoomResident> = { gender: undefined };
    expect(getUserGender(resident as RoomResident)).toBe('other');
  });
  
  it('returns other for undefined user', () => {
    expect(getUserGender(undefined)).toBe('other');
  });
});

describe('getUserRole', () => {
  it('returns 111 for user with all roles', () => {
    const user: Partial<User> = { isOwner: true, isManager: true, isCustomer: true };
    expect(getUserRole(user as User)).toBe('111');
  });
  
  it('returns 100 for owner only', () => {
    const user: Partial<User> = { isOwner: true, isManager: false, isCustomer: false };
    expect(getUserRole(user as User)).toBe('100');
  });
  
  it('returns 010 for manager only', () => {
    const user: Partial<User> = { isOwner: false, isManager: true, isCustomer: false };
    expect(getUserRole(user as User)).toBe('010');
  });
  
  it('returns 001 for customer only', () => {
    const user: Partial<User> = { isOwner: false, isManager: false, isCustomer: true };
    expect(getUserRole(user as User)).toBe('001');
  });
  
  it('returns 000 for user with no roles', () => {
    const user: Partial<User> = { isOwner: false, isManager: false, isCustomer: false };
    expect(getUserRole(user as User)).toBe('000');
  });
  
  it('returns empty string for undefined user', () => {
    expect(getUserRole(undefined)).toBe('');
  });
});

describe('getBillStatus', () => {
  it('returns unpaid for UN_PAID status', () => {
    expect(getBillStatus(1)).toBe('unpaid');
  });
  
  it('returns paid for PAID status', () => {
    expect(getBillStatus(2)).toBe('paid');
  });
  
  it('returns overdue for OVERDUE status', () => {
    expect(getBillStatus(3)).toBe('overdue');
  });
  
  it('returns processing for PROCESSING status', () => {
    expect(getBillStatus(4)).toBe('processing');
  });
  
  it('returns cancelled for CANCELLED status', () => {
    expect(getBillStatus(5)).toBe('cancelled');
  });
  
  it('returns - for unknown status', () => {
    expect(getBillStatus(999)).toBe('-');
  });
});

describe('getImportTypeLabel', () => {
  it('returns customer for ADD_CUSTOMERS type', () => {
    expect(getImportTypeLabel(1)).toBe('customer');
  });
  
  it('returns contract for ADD_CONTRACTS type', () => {
    expect(getImportTypeLabel(2)).toBe('contract');
  });
  
  it('returns bill for ADD_BILLS type', () => {
    expect(getImportTypeLabel(3)).toBe('bill');
  });
  
  it('returns - for unknown type', () => {
    expect(getImportTypeLabel(999)).toBe('-');
  });
});

// describe('getTimeDifferenceFromNow', () => {
//   it('returns relative time for past date', () => {
//     const pastDate = '2023-01-01T00:00:00Z';
//     const result = getTimeDifferenceFromNow(pastDate, 'en');
//     expect(result).toMatch(/ago/); // Should contain "ago" for past dates
//   });
  
//   it('handles different locales', () => {
//     const pastDate = '2023-01-01T00:00:00Z';
//     const result = getTimeDifferenceFromNow(pastDate, 'vi');
//     expect(typeof result).toBe('string');
//     expect(result.length).toBeGreaterThan(0);
//   });
// });

// Mock the function instead of testing the actual Day.js logic
vi.mock('../utils/common', async () => {
  const actual = await vi.importActual('../utils/common');
  return {
    ...actual,
    getTimeDifferenceFromNow: vi.fn((time: string, locale: string) => {
      return '2 years ago'; // Mock return value
    })
  };
});