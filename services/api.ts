import { useNuxtApp } from '#app';
import type { APIResponse } from '~/types/api_response';
import { apiRoutes } from '~/consts/api_routes';
import type {
  Building,
  BuildingImage,
  EditBuilding,
  NewBuildingInfo,
  Room,
  RoomImage,
  Service,
} from '~/types/building';
import type { UploadFile } from 'ant-design-vue';
import type { Bill } from '~/types/bill';
import type { ManagerSchedule, User } from '~/types/user';
import type { Dayjs } from 'dayjs';
import type { Contract } from '~/types/contract';
import type { ManagerResolveTicket } from '~/types/support_ticket';

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
    getList: async (): Promise<APIResponse<Building[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.list, {
        method: 'GET',
      });
    },
    addNewBuilding: async (building: NewBuildingInfo): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      const formData = new FormData();

      formData.append('name', building.name);
      formData.append('address', building.address);
      building.services.forEach((service) => {
        formData.append('services[]', JSON.stringify(service));
      });
      building.images.forEach((image) => {
        formData.append('images[]', image.originFileObj as File);
      });
      building.schedules.forEach((schedule) => {
        formData.append(
          'schedules[]',
          JSON.stringify({
            managerID: schedule.managerID,
            startDate: convertToDate(schedule.start as string),
            endDate: schedule.end ? convertToDate(schedule.end as string) : '',
          })
        );
      });
      formData.append('totalFloor', building.floors.length.toString());
      formData.append('totalRoom', building.floors.reduce((acc, floor) => acc + floor.rooms.length, 0).toString());
      building.floors.forEach((floor, floorIndex) => {
        floor.rooms.forEach((room, roomIndex) => {
          formData.append(
            'rooms[]',
            JSON.stringify({
              status: room.status,
              area: room.area,
              description: room.description,
              floor: floorIndex + 1,
              no: 1000 * (floorIndex + 1) + roomIndex + 1,
            })
          );
          room.images.forEach((image) => {
            formData.append(`roomImages[${1000 * (floorIndex + 1) + roomIndex + 1}]`, image.originFileObj as File);
          });
        });
      });

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
    updateBuilding(buildingID: number, data: EditBuilding, totalFloor: number): Promise<APIResponse<null>> {
      const $api = getApiInstance();
      const formData = new FormData();

      formData.append('id', buildingID.toString());
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('totalFloor', totalFloor.toString());
      data.images.forEach((image) => {
        if (image.isDeleted) {
          formData.append('deletedBuildingImages[]', (image as BuildingImage).ID.toString());
        } else if (image.isNew) {
          formData.append('newBuildingImages[]', (image as UploadFile).originFileObj as File);
        }
      });
      data.services.forEach((service) => {
        if (service.isDeleted) {
          formData.append('deletedServices[]', service.ID.toString());
        } else if (service.isNew) {
          formData.append(
            'newServices[]',
            JSON.stringify({
              name: service.name,
              price: Number(service.price),
            })
          );
        } else {
          formData.append(
            'services[]',
            JSON.stringify({
              id: service.ID,
              name: service.name,
              price: Number(service.price),
            })
          );
        }
      });
      data.schedules.forEach((schedule) => {
        if (schedule.isDeleted) {
          formData.append('deletedSchedules[]', schedule.ID.toString());
        } else if (schedule.isNew) {
          formData.append(
            'newSchedules[]',
            JSON.stringify({
              managerID: schedule.managerID,
              startDate: convertToDate(schedule.startDate.toDate().toISOString()),
              endDate: schedule.endDate ? convertToDate((schedule.endDate as Dayjs).toDate().toISOString()) : null,
            })
          );
        } else {
          formData.append(
            'schedules[]',
            JSON.stringify({
              id: schedule.ID,
              managerID: schedule.managerID,
              startDate: convertToDate(schedule.startDate.toDate().toISOString()),
              endDate: schedule.endDate ? convertToDate((schedule.endDate as Dayjs).toDate().toISOString()) : null,
            })
          );
        }
      });
      data.rooms.forEach((room) => {
        if (room.isDeleted) {
          formData.append('deletedRooms[]', room.ID.toString());
        } else if (room.isNew) {
          formData.append(
            'newRooms[]',
            JSON.stringify({
              floor: room.floor,
              no: room.no,
              status: room.status,
              area: Number(room.area),
              description: room.description,
            })
          );
          room.images.forEach((image) => {
            if (image.isNew) {
              formData.append(`newRoomImages[${room.no}]`, (image as UploadFile).originFileObj as File);
            }
          });
        } else {
          formData.append(
            'rooms[]',
            JSON.stringify({
              id: room.ID,
              floor: room.floor,
              no: room.no,
              status: room.status,
              area: Number(room.area),
              description: room.description,
            })
          );
          room.images.forEach((image) => {
            if (image.isDeleted) {
              formData.append('deletedRoomImages[]', (image as RoomImage).ID.toString());
            } else if (image.isNew) {
              formData.append(`newRoomImages[${room.no}]`, (image as UploadFile).originFileObj as File);
            }
          });
        }
      });

      return $api(apiRoutes.building.updateBuilding(buildingID), {
        method: 'POST',
        body: formData,
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
      offset: number = 0
    ): Promise<APIResponse<ManagerResolveTicket[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.staff.getTicket(staffId, limit, offset), {
        method: 'GET',
      });
    },
  },
  customer: {},
  bill: {
    getList: async (): Promise<APIResponse<Bill[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.bill.list, {
        method: 'GET',
      });
    },
  },
  support_ticket: {},
  notice: {},
  contract: {},
  import: {},
};

const api = {
  authentication,
  common,
};

export { api };
