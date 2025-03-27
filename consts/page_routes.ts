const pageRoutes = {
  authentication: {
    login: '/login',
    recovery: '/forgot-password',
    newPassword: '/new-password',
    verifyEmail: '/verify-email',
  },
  common: {
    building: {
      list: '/building',
      add: '/building/add',
      detail: (buildingId: number | string) => `/building/${buildingId}`,
      edit: (buildingId: number | string) => `/building/${buildingId}/edit`,
      roomDetail: (buildingId: number | string, roomId: number | string) => `/building/${buildingId}/room/${roomId}`,
      editRoom: (buildingId: number | string, roomId: number | string) => `/building/${buildingId}/room/${roomId}/edit`,
    },
    room: {
      list: '/room',
    },
    profile: {
      page: '/profile',
    },
    staff: {
      list: '/staff',
      add: '/staff/add',
      detail: (staffID: number | string) => `/staff/${staffID}`,
      edit: (staffID: number | string) => `/staff/${staffID}/edit`,
    },
    customer: {
      list: '/customer',
    },
    bill: {
      list: '/bill',
      detail: (billId: number | string) => `/bill/${billId}`,
      add: '/bill/add',
    },
    support_ticket: {
      list: '/support-ticket',
    },
    notice: {
      sent: '/notice/sent',
      new: '/notice/new',
      inbox: '/notice/inbox',
      starred: '/notice/starred',
    },
    contract: {
      list: '/contract',
      detail: (contractId: number | string) => `/contract/${contractId}`,
    },
    report: {
      page: '/report',
    },
  },
};

export { pageRoutes };
