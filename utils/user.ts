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

export { getUserName, getUserGender };
