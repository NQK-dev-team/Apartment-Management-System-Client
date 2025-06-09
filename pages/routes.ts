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
  {
    name: 'Edit Building',
    path: pageRoutes.common.building.edit(':id'),
    file: buildingBaseRoute + 'edit.vue',
  },
  {
    name: 'Building Room Detail',
    path: pageRoutes.common.building.roomDetail(':buildingID', ':roomID'),
    file: roomBaseRoute + 'detail.staff.vue',
  },
  // Room
  // Profile
  // Staff
  {
    name: 'Staff List',
    path: pageRoutes.common.staff.list,
    file: staffBaseRoute + 'list.vue',
  },
  {
    name: 'Add New Staff',
    path: pageRoutes.common.staff.add,
    file: staffBaseRoute + 'addStaff.vue',
  },
  {
    name: 'Staff Detail',
    path: pageRoutes.common.staff.detail(':id'),
    file: staffBaseRoute + 'detailStaff.vue',
  },
  {
    name: 'Edit Staff',
    path: pageRoutes.common.staff.edit(':id'),
    file: staffBaseRoute + 'edit.vue',
  },
  // Customer
  {
    name: 'Customer List',
    path: pageRoutes.common.customer.list,
    file: customerBaseRoute + 'list.vue',
  },
  {
    name: 'Add New Customer',
    path: pageRoutes.common.customer.add,
    file: customerBaseRoute + 'add.vue',
  },
  {
    name: 'Customer Detail',
    path: pageRoutes.common.customer.detail(':id'),
    file: customerBaseRoute + 'detail.vue',
  },
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
  {
    name: 'Add New Bill',
    path: pageRoutes.common.bill.add,
    file: billBaseRoute + 'add.vue',
  },
  {
    name: 'Edit Bill',
    path: pageRoutes.common.bill.edit(':id'),
    file: billBaseRoute + 'edit.vue',
  },
  // Contract
  {
    name: 'Contract List',
    path: pageRoutes.common.contract.list,
    file: contractBaseRoute + 'list.vue',
  },
  {
    name: 'Contract Detail',
    path: pageRoutes.common.contract.detail(':id'),
    file: contractBaseRoute + 'detail.vue',
  },
  {
    name: 'Add New Contract',
    path: pageRoutes.common.contract.add,
    file: contractBaseRoute + 'add.vue',
  },
  // {
  //   name: 'Edit Contract',
  //   path: pageRoutes.common.contract.edit(':id'),
  //   file: contractBaseRoute + 'edit.vue',
  // },
  // Support ticket
  {
    name: 'Support ticket list',
    path: pageRoutes.common.support_ticket.list,
    file: supportTicketBaseRoute + 'list.vue',
  },
  // Notice
  {
    name: 'New notice',
    path: pageRoutes.common.notice.new,
    file: noticeBaseRoute + 'newNotice.vue',
  },
];

const appRoutes = [...authenticationRoutes, ...commonRoutes];

export { appRoutes };
