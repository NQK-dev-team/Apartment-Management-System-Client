import { HTTP_STATUS } from './http_status';

const COMMON = {
  HIDDEN_OPTION: 0,
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
  IMPORT_TYPE: {
    ADD_BUILDINGS: 1,
    ADD_ROOMS: 2,
    ADD_EMPLOYEES: 3,
    ADD_CUSTOMERS: 4,
    ADD_BILLS: 5,
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
  },
  HTTP_STATUS,
  ALLOW_IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png'],
  ALLOW_FILE_EXTENSIONS: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
  ALLOW_FILE_EXTENSIONS_ADVANCE: ['vnd.openxmlformats-officedocument.wordprocessingml.document', 'msword'],
  IMAGE_SIZE_LIMIT: 2 * 1024 * 1024, // 2MB
  IMAGE_SIZE_LIMIT_STR: '2MB',
  FILE_SIZE_LIMIT: 10 * 1024 * 1024, // 10MB
  FILE_SIZE_LIMIT_STR: '10MB',
};

export { COMMON };
