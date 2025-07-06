import { COMMON } from '~/consts/common';
import type { User } from '~/types/user';
import type { RoomResident } from '~/types/contract';

function getUserName(user: User | RoomResident | undefined): string {
  if (!user) {
    return '';
  }

  let name = user.lastName;

  if (user.middleName.Valid) {
    name += ` ${user.middleName.String}`;
  }

  name += ` ${user.firstName}`;

  return name;
}

function getUserGender(user: User | RoomResident | undefined): string {
  if (!user) {
    return 'other';
  }

  return user.gender === COMMON.USER_GENDER.MALE
    ? 'male'
    : user.gender === COMMON.USER_GENDER.FEMALE
      ? 'female'
      : 'other';
}

function getUserRole(user: User | undefined): string {
  if (!user) {
    return '';
  }

  let string = '';
  if (user.isOwner) {
    string += '1';
  } else {
    string += '0';
  }

  if (user.isManager) {
    string += '1';
  } else {
    string += '0';
  }

  if (user.isCustomer) {
    string += '1';
  } else {
    string += '0';
  }

  return string;
}

function getContractType(type: number): string {
  switch (type) {
    case COMMON.CONTRACT_TYPE.RENT:
      return 'rent_contract';
    case COMMON.CONTRACT_TYPE.BUY:
      return 'buy_contract';
    default:
      return 'N/A';
  }
}

function getContractStatus(status: number): string {
  switch (status) {
    case COMMON.CONTRACT_STATUS.ACTIVE:
      return 'active';
    case COMMON.CONTRACT_STATUS.EXPIRED:
      return 'expired';
    case COMMON.CONTRACT_STATUS.CANCELLED:
      return 'cancelled';
    case COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE:
      return 'wait_for_signature';
    case COMMON.CONTRACT_STATUS.NOT_IN_EFFECT:
      return 'not_in_effect';
    default:
      return 'N/A';
  }
}

function getBillStatus(status: number): string {
  switch (status) {
    case COMMON.BILL_STATUS.UN_PAID:
      return 'unpaid';
    case COMMON.BILL_STATUS.PAID:
      return 'paid';
    case COMMON.BILL_STATUS.OVERDUE:
      return 'overdue';
    case COMMON.BILL_STATUS.PROCESSING:
      return 'processing';
    default:
      return 'N/A';
  }
}

export { getContractType, getContractStatus, getUserName, getUserGender, getUserRole, getBillStatus };
