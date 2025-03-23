import type { User } from '~/types/user';

function getUserName(user: User | undefined): string {
  if (!user) {
    return '';
  }

  let name = user.firstName;

  if (user.middleName) {
    name += ` ${user.middleName}`;
  }

  name += ` ${user.lastName}`;

  return name;
}

function getUserGender(user: User | undefined): string {
  if (!user) {
    return 'other';
  }

  return user.gender === 1 ? 'male' : user.gender === 2 ? 'female' : 'other';
}

export { getUserName, getUserGender };
