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
    list: (getAll: boolean = false) => `/building?getAll=${getAll}`,
    detail: (buildingId: number) => `/building/${buildingId}`,
    room: (buildingId: number) => `/building/${buildingId}/room`,
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
    add: '/staff/add',
    update: (staffId: number) => `/staff/${staffId}/update`,
    deleteMany: '/staff/delete-many',
    getSchedule: (staffId: number) => `/staff/${staffId}/schedule`,
    getContract: (staffId: number) => `/staff/${staffId}/contract`,
    getTicket: (
      staffId: number,
      limit: number = 500,
      offset: number = 0,
      startDate: string = '',
      endDate: string = ''
    ) => `/staff/${staffId}/ticket?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}`,
  },
  customer: {
    list: (limit: number = 500, offset: number = 0) => `/customer?limit=${limit}&offset=${offset}`,
    detail: (customerId: number) => `/customer/${customerId}`,
    add: '/customer/add',
    edit: (customerId: number) => `/customer/${customerId}/edit`,
    deleteMany: '/customer/delete-many',
    getContract: (customerId: number) => `/customer/${customerId}/contract`,
    getTicket: (customerId: number) => `/customer/${customerId}/ticket`,
  },
  bill: {
    list: '/bill',
    detail: (billId: number) => `/bill/${billId}`,
    add: '/bill/add',
    edit: (billId: number) => `/bill/${billId}/edit`,
  },
  support_ticket: {
    approve: (ticketId: number) => `/support-ticket/${ticketId}/approve`,
    deny: (ticketId: number) => `/support-ticket/${ticketId}/deny`,
    getList: (limit: number = 500, offset: number = 0, startDate: string = '', endDate: string = '') =>
      `/support-ticket?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}`,
  },
  notice: {},
  contract: {},
  import: {},
};

export { apiRoutes };
