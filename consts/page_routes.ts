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
      roomDetail: (buildingId: number | string, roomID: number | string) => `/building/${buildingId}/room/${roomID}`,
    },
    room: {
      list: '/room',
      detail: (roomId: number | string) => `/room/${roomId}`,
    },
    profile: {
      index: '/profile',
    },
    security: {
      index: '/security',
    },
    staff: {
      list: '/staff',
      add: '/staff/add',
      detail: (staffID: number | string) => `/staff/${staffID}`,
      edit: (staffID: number | string) => `/staff/${staffID}/edit`,
    },
    customer: {
      list: '/customer',
      add: '/customer/add',
      detail: (customerId: number | string) => `/customer/${customerId}`,
    },
    bill: {
      list: '/bill',
      detail: (billId: number | string) => `/bill/${billId}`,
      add2: (contractID: number | null = null) => {
        return contractID ? `/bill/add?contract=${contractID}` : '/bill/add';
      },
      add: `/bill/add`,
      edit: (billId: number | string) => `/bill/${billId}/edit`,
    },
    support_ticket: {
      list: '/support-ticket',
    },
    notice: {
      index: '/notice',
      sent: '/notice/sent',
      new: '/notice/new',
      inbox: (id: number | null = null) => (id ? `/notice/inbox?id=${id}` : '/notice/inbox'),
      important: '/notice/important',
      // edit: (noticeId: number | string) => `/notice/${noticeId}/edit`,
    },
    contract: {
      list: '/contract',
      detail: (contractId: number | string) => `/contract/${contractId}`,
      add2: (buildingID: number | null = null, floor: number | null = null, roomID: number | null = null) => {
        return buildingID && floor && roomID
          ? `/contract/add?buildingID=${buildingID}&floor=${floor}&roomID=${roomID}`
          : '/contract/add';
      },
      add: `/contract/add`,
      add3: (customerID: number | null = null) => {
        return customerID ? `/contract/add?customerID=${customerID}` : '/contract/add';
      },
      edit: (contractId: number | string) => `/contract/${contractId}/edit`,
    },
    report: {
      index: '/',
    },
  },
};

export { pageRoutes };
