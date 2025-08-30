import { COMMON } from '~/consts/common';
import type { User } from '~/types/user';
import type { RoomResident } from '~/types/contract';
import dayjs from 'dayjs';

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

function getUserGender(user: User | RoomResident | undefined, gender: number | undefined = undefined): string {
  if (gender) {
    return gender === COMMON.USER_GENDER.MALE ? 'male' : gender === COMMON.USER_GENDER.FEMALE ? 'female' : 'other';
  }

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
      return '-';
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
      return '-';
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
    case COMMON.BILL_STATUS.CANCELLED:
      return 'cancelled';
    default:
      return '-';
  }
}

function getImportTypeLabel(type: number): string {
  switch (type) {
    case COMMON.UPLOAD_TYPE.ADD_CUSTOMERS:
      return 'customer';
    case COMMON.UPLOAD_TYPE.ADD_CONTRACTS:
      return 'contract';
    case COMMON.UPLOAD_TYPE.ADD_BILLS:
      return 'bill';
    default:
      return '-';
  }
}

function getFileSizeString(size: number): string {
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(2)} ${units[i]}`;
}

function getTimeDifferenceFromNow(time: string, locale: string): string {
  return dayjs(time).locale(locale).fromNow();
}

function convertMonthToText(month: number): string {
  switch (month) {
    case 1:
      return 'january';
    case 2:
      return 'february';
    case 3:
      return 'march';
    case 4:
      return 'april';
    case 5:
      return 'may';
    case 6:
      return 'june';
    case 7:
      return 'july';
    case 8:
      return 'august';
    case 9:
      return 'september';
    case 10:
      return 'october';
    case 11:
      return 'november';
    case 12:
      return 'december';
    default:
      return '';
  }
}

export {
  getContractType,
  getContractStatus,
  getUserName,
  getUserGender,
  getUserRole,
  getBillStatus,
  getImportTypeLabel,
  getFileSizeString,
  getTimeDifferenceFromNow,
  convertMonthToText,
};
