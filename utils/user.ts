import type { User } from '~/types/user';
import { COMMON } from '~/consts/common';

function getUserName(user: User | undefined): string {
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

function getUserGender(user: User | undefined): string {
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

export { getUserName, getUserGender, getUserRole };
