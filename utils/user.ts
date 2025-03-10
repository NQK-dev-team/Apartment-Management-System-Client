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

export { getUserName };
