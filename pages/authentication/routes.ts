import type { Route } from '~/types/route';

const authenticationBaseRoute = '@/pages/authentication/';

const authenticationRoutes: Route[] = [
  {
    name: 'Login',
    path: '/login',
    file: authenticationBaseRoute + 'login.vue',
  },
  {
    name: 'Recovery',
    path: '/forgot-password',
    file: authenticationBaseRoute + 'recovery.vue',
  },
];

export default authenticationRoutes;
