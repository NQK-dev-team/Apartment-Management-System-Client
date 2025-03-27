const apiRoutes = {
  authentication: {
    login: '/authentication/login',
    logout: '/authentication/logout',
    recovery: '/authentication/recovery',
    refreshToken: '/authentication/refresh-token',
    verifyToken: '/authentication/verify-token',
    checkPasswordResetToken: '/authentication/check-reset-password-token',
    resetPassword: '/authentication/reset-password',
    verifyEmail: '/authentication/verify-email',
    verifyPassword: '/authentication/verify-password',
  },
  building: {
    list: '/building',
    detail: (buildingId: number) => `/building/${buildingId}`,
    roomDetail: (buildingId: number, roomId: number) => `/building/${buildingId}/room/${roomId}`,
    add: '/building/add',
    delete: (buildingID: number) => `/building/${buildingID}`,
    getSchedule: (buildingID: number) => `/building/${buildingID}/schedule`,
    updateBuilding: (buildingID: number) => `/building/${buildingID}/update`,
  },
  room: {},
  profile: {},
  staff: {
    list: '/staff',
    detail: (staffId: number) => `/staff/${staffId}`,
    add: '/staff',
    deleteMany: '/staff/delete-many',
  },
  customer: {
    list: '/customer',
    detail: (customerId: number) => `/customer/${customerId}`,
    add: '/customer/add',
    edit: (customerId: number) => `/customer/${customerId}/edit`,
  },
  bill: {
    list: '/bill',
    detail: (billId: number) => `/bill/${billId}`,
    add: '/bill/add',
    edit: (billId: number) => `/bill/${billId}/edit`,
  },
  support_ticket: {},
  notice: {},
  contract: {},
  import: {},
};

export { apiRoutes };
