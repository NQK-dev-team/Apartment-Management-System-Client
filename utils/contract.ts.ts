import { COMMON } from '~/consts/common';

function getContractType(type: number): string {
  switch (type) {
    case COMMON.CONTRACT_TYPE.RENT:
      return 'rent';
    case COMMON.CONTRACT_TYPE.BUY:
      return 'buy';
    default:
      return 'N/A';
  }
}

function getContractStatus(status: number): string {
  switch (status) {
    case COMMON.CONTRACT_STATUS.ACTIVE:
      return 'active';
    case COMMON.CONTRACT_STATUS.EXPIRED:
      return 'expired';
    case COMMON.CONTRACT_STATUS.CANCELLED:
      return 'cancelled';
    case COMMON.CONTRACT_STATUS.WAITING_FOR_SIGNATURE:
      return 'wait_for_signature';
    case COMMON.CONTRACT_STATUS.NOT_IN_EFFECT:
      return 'not_in_effect';
    default:
      return 'unknown';
  }
}

export { getContractType, getContractStatus };
