import { useNuxtApp } from '#app';
import type { APIResponse } from '~/types/api_response';
import { apiRoutes } from '~/consts/api_routes';
import type { Building, Room } from '~/types/building';
import type { Bill, UpdateBill } from '~/types/bill';
import type { EditStaff, ManagerSchedule, NewCustomer, User } from '~/types/user';
import type { Dayjs } from 'dayjs';
import type { Contract } from '~/types/contract';
import type { SupportTicket } from '~/types/support_ticket';

function getApiInstance() {
  const { $api } = useNuxtApp();
  return $api;
}

const authentication = {
  login: async (email: string, password: string, remember: boolean): Promise<APIResponse<null>> => {
    const $api = getApiInstance();
    return $api(apiRoutes.authentication.login, {
      method: 'POST',
      body: {
        email,
        password,
        remember,
      },
    });
  },
  logout: async (): Promise<APIResponse<null>> => {
    const $api = getApiInstance();
    return $api(apiRoutes.authentication.logout, {
      method: 'POST',
    });
  },
  recovery: async (email: string): Promise<APIResponse<null>> => {
    const $api = getApiInstance();
    return $api(apiRoutes.authentication.recovery, {
      method: 'POST',
      body: {
        email,
      },
    });
  },
  checkPasswordResetToken: async (email: string, token: string): Promise<APIResponse<null>> => {
    const $api = getApiInstance();
    return $api(apiRoutes.authentication.checkPasswordResetToken, {
      method: 'POST',
      body: {
        email,
        token,
      },
    });
  },
  resetPassword: async (
    email: string,
    token: string,
    password: string,
    confirmPassword: string
  ): Promise<APIResponse<null>> => {
    const $api = getApiInstance();
    return $api(apiRoutes.authentication.resetPassword, {
      method: 'POST',
      body: {
        email,
        token,
        password,
        confirmPassword,
      },
    });
  },
  verifyEmail: async (email: string, token: string): Promise<APIResponse<null>> => {
    const $api = getApiInstance();
    return $api(apiRoutes.authentication.verifyEmail, {
      method: 'POST',
      body: {
        token,
        email,
      },
    });
  },
  verifyPassword: async (password: string): Promise<APIResponse<boolean>> => {
    const $api = getApiInstance();
    return $api(apiRoutes.authentication.verifyPassword, {
      method: 'POST',
      body: {
        password,
      },
    });
  },
};

const common = {
  building: {
    getList: async (getAll: boolean = false): Promise<APIResponse<Building[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.list(getAll), {
        method: 'GET',
      });
    },
    getRoomList: async (buildingId: number): Promise<APIResponse<Room[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.room(buildingId), {
        method: 'GET',
      });
    },
    addNewBuilding: async (formData: FormData): Promise<APIResponse<number>> => {
      const $api = getApiInstance();

      return $api(apiRoutes.building.add, {
        method: 'POST',
        body: formData,
      });
    },
    deleteBuilding: async (buildingId: number): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.delete(buildingId), {
        method: 'DELETE',
      });
    },
    getDetail: async (buildingId: number): Promise<APIResponse<Building>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.detail(buildingId), {
        method: 'GET',
      });
    },
    getSchedule(buildingID: number): Promise<APIResponse<ManagerSchedule[]>> {
      const $api = getApiInstance();
      return $api(apiRoutes.building.getSchedule(buildingID), {
        method: 'GET',
      });
    },
    updateBuilding(buildingID: number, formData: FormData): Promise<APIResponse<null>> {
      const $api = getApiInstance();

      return $api(apiRoutes.building.updateBuilding(buildingID), {
        method: 'POST',
        body: formData,
      });
    },
    getRoomDetail: async (buildingId: number, roomId: number): Promise<APIResponse<Room>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.getRoom(buildingId, roomId), {
        method: 'GET',
      });
    },
    getRoomContracts: async (buildingId: number, roomId: number): Promise<APIResponse<Contract[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.getRoomContracts(buildingId, roomId), {
        method: 'GET',
      });
    },
    getRoomTickets: async (
      buildingId: number,
      roomId: number,
      startDate: string = '',
      endDate: string = ''
    ): Promise<APIResponse<SupportTicket[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.getRoomTickets(buildingId, roomId, startDate, endDate), {
        method: 'GET',
      });
    },
    deleteRoomContracts: async (
      buildingId: number,
      roomId: number,
      contractIDs: number[]
    ): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.deleteRoomContracts(buildingId, roomId), {
        method: 'POST',
        body: {
          IDs: contractIDs,
        },
      });
    },
    updateRoom: async (buildingId: number, roomId: number, data: FormData): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.updateRoom(buildingId, roomId), {
        method: 'POST',
        body: data,
      });
    },
  },
  room: {},
  profile: {},
  staff: {
    getList: async (): Promise<APIResponse<User[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.staff.list, {
        method: 'GET',
      });
    },
    deleteMany: async (staffIds: number[]): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.staff.deleteMany, {
        method: 'POST',
        body: {
          IDs: staffIds,
        },
      });
    },
    getDetail: async (staffId: number): Promise<APIResponse<User>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.staff.detail(staffId), {
        method: 'GET',
      });
    },
    getSchedule: async (staffId: number): Promise<APIResponse<ManagerSchedule[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.staff.getSchedule(staffId), {
        method: 'GET',
      });
    },
    getContract: async (staffId: number): Promise<APIResponse<Contract[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.staff.getContract(staffId), {
        method: 'GET',
      });
    },
    getTicket: async (
      staffId: number,
      limit: number = 500,
      offset: number = 0,
      startDate: string = '',
      endDate: string = ''
    ): Promise<APIResponse<SupportTicket[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.staff.getTicket(staffId, limit, offset, startDate, endDate), {
        method: 'GET',
      });
    },
    add: async (data: FormData): Promise<APIResponse<number>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.staff.add, {
        method: 'POST',
        body: data,
      });
    },
    update: async (staffID: number, data: FormData): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.staff.update(staffID), {
        method: 'POST',
        body: data,
      });
    },
  },
  customer: {
    getList: async (limit: number = 500, offset: number = 0): Promise<APIResponse<User[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.customer.list(limit, offset), {
        method: 'GET',
      });
    },
    deleteMany: async (customerIds: number[]): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.customer.deleteMany, {
        method: 'POST',
        body: {
          IDs: customerIds,
        },
      });
    },
    getDetail: async (customerId: number): Promise<APIResponse<User>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.customer.detail(customerId), {
        method: 'GET',
      });
    },
    getContract: async (customerId: number): Promise<APIResponse<Contract[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.customer.getContract(customerId), {
        method: 'GET',
      });
    },
    getTicket: async (customerId: number): Promise<APIResponse<SupportTicket[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.customer.getTicket(customerId), {
        method: 'GET',
      });
    },
    add: async (data: FormData): Promise<APIResponse<number>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.customer.add, {
        method: 'POST',
        body: data,
      });
    },
  },
  bill: {
    getList: async (
      limit: number = 500,
      offset: number = 0,
      startMonth: string = '',
      endMonth: string = ''
    ): Promise<APIResponse<Bill[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.bill.list(limit, offset, startMonth, endMonth), {
        method: 'GET',
      });
    },
    deleteMany: async (billIds: number[]): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.bill.deleteMany, {
        method: 'POST',
        body: {
          IDs: billIds,
        },
      });
    },
    getDetail: async (billId: number): Promise<APIResponse<Bill>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.bill.detail(billId), {
        method: 'GET',
      });
    },
    updateBill: async (billId: number, data: UpdateBill): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.bill.update(billId), {
        method: 'POST',
        body: data,
      });
    },
  },
  support_ticket: {
    approve: async (ticketId: number): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.support_ticket.approve(ticketId), {
        method: 'POST',
      });
    },
    deny: async (ticketId: number): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.support_ticket.deny(ticketId), {
        method: 'POST',
      });
    },
    getList: async (
      limit: number = 500,
      offset: number = 0,
      startDate: string = '',
      endDate: string = ''
    ): Promise<APIResponse<SupportTicket[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.support_ticket.getList(limit, offset, startDate, endDate), {
        method: 'GET',
      });
    },
  },
  notice: {},
  contract: {
    getList: async (limit: number = 500, offset: number = 0): Promise<APIResponse<Contract[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.contract.list(limit, offset), {
        method: 'GET',
      });
    },
    deleteMany: async (contractIds: number[]): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.contract.deleteMany, {
        method: 'POST',
        body: {
          IDs: contractIds,
        },
      });
    },
    getDetail: async (contractId: number): Promise<APIResponse<Contract>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.contract.detail(contractId), {
        method: 'GET',
      });
    },
    getContractBill: async (contractId: number): Promise<APIResponse<Bill[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.contract.bill(contractId), {
        method: 'GET',
      });
    },
    updateContract: async (contractID: number, data: FormData): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.contract.edit(contractID), {
        method: 'POST',
        body: data,
      });
    },
    addContract: async (data: FormData): Promise<APIResponse<number>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.contract.add, {
        method: 'POST',
        body: data,
      });
    },
    getActiveList: async (limit: number = 500, offset: number = 0): Promise<APIResponse<Contract[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.contract.activeList(limit, offset), {
        method: 'GET',
      });
    },
  },
  import: {},
};

const api = {
  authentication,
  common,
};

export { api };
