import type { Route } from '~/types/route';

const commonBaseRoute = '@/pages/common/';

const commonRoutes: Route[] = [
  {
    name: 'Building List',
    path: '/building',
    file: commonBaseRoute + 'building/list.vue',
  },
];

export default commonRoutes;
