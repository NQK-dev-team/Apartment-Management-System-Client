import { HTTP_STATUS } from './http_status';

const COMMON = {
  HIDDEN_OPTION: 0,
  LOCALE: {
    VI: 'vi',
    EN: 'en',
    VI_FULL: 'vi-VN',
    EN_FULL: 'en-US',
  },
  SUPPORT_TICKET_STATUS: {
    PENDING: 1,
    APPROVED: 2,
    REJECTED: 3,
  },
  CONTRACT_STATUS: {
    ACTIVE: 1,
    EXPIRED: 2,
    CANCELLED: 3,
    WAITING_FOR_SIGNATURE: 4,
    NOT_IN_EFFECT: 5,
  },
  CONTRACT_TYPE: {
    RENT: 1,
    BUY: 2,
  },
  ROOM_STATUS: {
    RENTED: 1,
    SOLD: 2,
    AVAILABLE: 3,
    MAINTANCED: 4,
    UNAVAILABLE: 5,
  },
  USER_GENDER: {
    MALE: 1,
    FEMALE: 2,
    OTHER: 3,
  },
  UPLOAD_TYPE: {
    ADD_CUSTOMERS: 1,
    ADD_CONTRACTS: 2,
    ADD_BILLS: 3,
  },
  PROCESS_RESULT: {
    SUCCESS: 1,
    FAILED: 2,
  },
  RESIDENT_TYPE: {
    CHILD: 1,
    SPOUSE: 2,
    PARENT: 3,
    OTHER: 4,
  },
  BILL_STATUS: {
    UN_PAID: 1,
    PAID: 2,
    OVERDUE: 3,
    PROCESSING: 4,
    CANCELLED: 5,
  },
  NOTIFICATION: {
    READ: 1,
    UNREAD: 0,
    MARKED: 1,
    UNMARKED: 0,
  },
  WEBSOCKET_SIGNAL_TYPE: {
    NEW_INBOX: 1,
    NEW_IMPORTANT: 2,
    NEW_SENT: 3,
    UPLOAD_CUSTOMER: 4,
    UPLOAD_CONTRACT: 5,
    UPLOAD_BILL: 6,
  },
  HTTP_STATUS,
  ALLOW_IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png'],
  ALLOW_FILE_EXTENSIONS: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
  ALLOW_FILE_EXTENSIONS_ADVANCE: ['vnd.openxmlformats-officedocument.wordprocessingml.document', 'msword'],
  // ALLOW_UPLOAD_FILE_EXTENSIONS: ['.xls', '.xlsx'],
  // ALLOW_UPLOAD_FILE_EXTENSIONS_ADVANCE: ['vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.ms-excel'],
  ALLOW_UPLOAD_FILE_EXTENSIONS: ['.xlsx'],
  ALLOW_UPLOAD_FILE_EXTENSIONS_ADVANCE: ['vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  IMAGE_SIZE_LIMIT: 2 * 1024 * 1024, // 2MB
  IMAGE_SIZE_LIMIT_STR: '2MB',
  FILE_SIZE_LIMIT: 10 * 1024 * 1024, // 10MB
  FILE_SIZE_LIMIT_STR: '10MB',
  UPLOAD_FILE_SIZE_LIMIT: 20 * 1024 * 1024, // 20MB
  UPLOAD_FILE_SIZE_LIMIT_STR: '20MB',
  MAX_LENGTH: {
    BILL_TITLE: 255,
    BILL_NOTE: 255,
    PAYMENT_NAME: 255,
    PAYMENT_NOTE: 255,
    NOTIFICATION_TITLE: 255,
    FIRST_NAME: 255,
    LAST_NAME: 255,
    MIDDLE_NAME: 255,
    POB: 255,
    PERMANENT_ADDRESS: 255,
    TEMPORARY_ADDRESS: 255,
    EMAIL: 255,
    PASSWORD: 30,
    SUPPORT_TICKET_TITLE: 255,
    CONTRACT_FILE_NAME: 255,
    ROOM_DESCRIPTION: 255,
    BUILDING_NAME: 255,
    BUILDING_ADDRESS: 255,
    SERVICE_NAME: 255,
  },
  SYSTEM_START_YEAR: 2020,
};

export { COMMON };
