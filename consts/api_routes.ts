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
  },
  building: {
    list: '/building',
    detail: (buildingId: number) => `/building/${buildingId}`,
    room: (buildingId: number) => `/building/${buildingId}/room`,
    roomDetail: (buildingId: number, roomId: number) => `/building/${buildingId}/room/${roomId}`,
    add: '/building/add',
  },
  room: {},
  profile: {},
  staff: {},
  customer: {},
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
