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
  {
    name: 'New Password',
    path: pageRoutes.authentication.newPassword,
    file: authenticationBaseRoute + 'new_password.vue',
  },
  {
    name: 'Email Verification',
    path: pageRoutes.authentication.verifyEmail,
    file: authenticationBaseRoute + 'verify_email.vue',
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
  {
    name: 'Building Detail',
    path: pageRoutes.common.building.detail(':id'),
    file: buildingBaseRoute + 'detail.vue',
  },
  {
    name: 'Add New Building',
    path: pageRoutes.common.building.add,
    file: buildingBaseRoute + 'add.vue',
  },
  // Room
  // Profile
  // Staff
  // Customer
  // Bill
  {
    name: 'Bill List',
    path: pageRoutes.common.bill.list,
    file: billBaseRoute + 'list.vue',
  },
  {
    name: 'Bill Detail',
    path: pageRoutes.common.bill.detail(':id'),
    file: billBaseRoute + 'detail.vue',
  },
  // Contract
  // Support ticket
  // Notice
];

const appRoutes = [...authenticationRoutes, ...commonRoutes];

export { appRoutes };
