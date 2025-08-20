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
    getRoom: (buildingId: number, roomId: number) => `/building/${buildingId}/room/${roomId}`,
    getRoomContracts: (buildingId: number, roomId: number) => `/building/${buildingId}/room/${roomId}/contracts`,
    getRoomTickets: (buildingId: number, roomId: number, startDate: string = '', endDate: string = '') =>
      `/building/${buildingId}/room/${roomId}/tickets?startDate=${startDate}&endDate=${endDate}`,
    deleteRoomContracts: (buildingId: number, roomId: number) =>
      `/building/${buildingId}/room/${roomId}/delete-contracts`,
    updateRoom: (buildingId: number, roomId: number) => `/building/${buildingId}/room/${roomId}/update`,
    add: '/building/add',
    delete: (buildingID: number) => `/building/${buildingID}`,
    getSchedule: (buildingID: number) => `/building/${buildingID}/schedule`,
    updateBuilding: (buildingID: number) => `/building/${buildingID}/update`,
  },
  room: {
    getList: '/room',
    getDetail: (roomId: number) => `/room/${roomId}`,
    getTicket: (roomId: number) => `/room/${roomId}/support-ticket`,
  },
  profile: {
    getProfile: `/user/profile`,
    updateProfile: `/user/profile/update`,
  },
  security: {
    changePassword: `/user/security/change-password`,
    changeEmail: `/user/security/change-email`,
  },
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
    list: (limit: number = 500, offset: number = 0, startMonth: string = '', endMonth: string = '') =>
      `/bill?limit=${limit}&offset=${offset}&startMonth=${startMonth}&endMonth=${endMonth}`,
    detail: (billId: number) => `/bill/${billId}`,
    add: '/bill/add',
    edit: (billId: number) => `/bill/${billId}/edit`,
    deleteMany: '/bill/delete-many',
    update: (billId: number) => `/bill/${billId}/update`,
  },
  support_ticket: {
    approve: (ticketId: number) => `/support-ticket/${ticketId}/approve`,
    deny: (ticketId: number) => `/support-ticket/${ticketId}/deny`,
    getList: (limit: number = 500, offset: number = 0, startDate: string = '', endDate: string = '') =>
      `/support-ticket?limit=${limit}&offset=${offset}&startDate=${startDate}&endDate=${endDate}`,
    deleteMany: '/support-ticket/delete-many',
    update: (ticketId: number) => `/support-ticket/${ticketId}/update`,
    add: '/support-ticket/add',
  },
  notice: {
    add: `/notification/add`,
    inbox: (limit: number = 500, offset: number = 0) => `/notification/inbox?limit=${limit}&offset=${offset}`,
    readNotification: (notificationId: number) => `/notification/${notificationId}/read`,
    unreadNotification: (notificationId: number) => `/notification/${notificationId}/unread`,
    markNotification: (notificationId: number) => `/notification/${notificationId}/mark`,
    unmarkNotification: (notificationId: number) => `/notification/${notificationId}/unmark`,
    getSent: (limit: number = 500, offset: number = 0) => `/notification/sent?limit=${limit}&offset=${offset}`,
    markManyAsRead: `/notification/read-many`,
    // delete: (notificationId: number) => `/notification/${ notificationId }`,
    // getDetail: (notificationId: number) => `/notification/${ notificationId }`,
  },
  contract: {
    list: (limit: number = 500, offset: number = 0) => `/contract?limit=${limit}&offset=${offset}`,
    detail: (contractId: number) => `/contract/${contractId}`,
    add: '/contract/add',
    edit: (contractId: number) => `/contract/${contractId}/update`,
    deleteMany: '/contract/delete-many',
    bill: (contractId: number) => `/contract/${contractId}/bill`,
    activeList: (limit: number = 500, offset: number = 0) => `/contract/active-list?limit=${limit}&offset=${offset}`,
  },
  upload: {
    getUploadFiles: (type: number) => `upload/not-process?type=${type}`,
    getProcessedFiles: (type: number, date: string) => `upload/processed?type=${type}&date=${date}`,
    uploadFile: 'upload/add',
  },
};

export { apiRoutes };
