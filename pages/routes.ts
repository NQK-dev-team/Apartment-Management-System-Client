import type { Route } from '~/types/route';
import { pageRoutes } from '../consts/page_routes';

const authenticationBaseRoute = '@/pages/authentication/';

const authenticationRoutes: Route[] = [
  {
    name: 'Login',
    path: pageRoutes.authentication.login,
    file: authenticationBaseRoute + 'login.vue',
  },
  {
    name: 'Recovery',
    path: pageRoutes.authentication.recovery,
    file: authenticationBaseRoute + 'recovery.vue',
  },
];

const buildingBaseRoute = '@/pages/common/building/';
const roomBaseRoute = '@/pages/common/room/';
const profileBaseRoute = '@/pages/common/profile/';
const staffBaseRoute = '@/pages/common/staff/';
const customerBaseRoute = '@/pages/common/customer/';
const billBaseRoute = '@/pages/common/bill/';
const contractBaseRoute = '@/pages/common/contract/';
const supportTicketBaseRoute = '@/pages/common/support_ticket/';
const noticeBaseRoute = '@/pages/common/notice/';

const commonRoutes: Route[] = [
  // Building
  {
    name: 'Building List',
    path: pageRoutes.common.building.list,
    file: buildingBaseRoute + 'list.vue',
  },
  // Room
  // Profile
  // Staff
  // Customer
  // Bill
  // Contract
  // Support ticket
  // Notice
];

const appRoutes = [...authenticationRoutes, ...commonRoutes];

export { appRoutes };
