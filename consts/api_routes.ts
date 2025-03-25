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
    getSchedule: (staffId: number) => `/staff/${staffId}/schedule`,
    getContract: (staffId: number) => `/staff/${staffId}/contract`,
    getTicket: (staffId: number, limit: number = 500, offset: number = 0) =>
      `/staff/${staffId}/ticket?limit=${limit}&offset=${offset}`,
  },
  customer: {
    list: '/customer',
    detail: (customerId: number) => `/customer/${customerId}`,
    add: '/customer',
  },
  bill: {
    list: '/bill',
    detail: (billId: number) => `/bill/${billId}`,
    add: '/bill/add',
  },
  support_ticket: {},
  notice: {},
  contract: {},
  import: {},
};

export { apiRoutes };
