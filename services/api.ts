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
    getRoomList: async (buildingId: number): Promise<APIResponse<Room[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.room(buildingId), {
        method: 'GET',
      });
    },
    getServiceList: async (buildingId: number): Promise<APIResponse<Service[]>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.service(buildingId), {
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
    deleteRooms: async (buildingId: number, IDs: number[]): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.deleteRooms(buildingId), {
        method: 'POST',
        body: {
          IDs,
        },
      });
    },
    deleteServices: async (buildingId: number, IDs: number[]): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.deleteServices(buildingId), {
        method: 'POST',
        body: {
          IDs,
        },
      });
    },
    addService: async (buildingId: number, service: { name: string; price: number }): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.addService(buildingId), {
        method: 'POST',
        body: {
          name: service.name,
          price: service.price,
        },
      });
    },
    editService: async (
      buildingId: number,
      service: { ID: number; name: string; price: number }
    ): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      return $api(apiRoutes.building.editService(buildingId, service.ID), {
        method: 'POST',
        body: {
          name: service.name,
          price: service.price,
        },
      });
    },
    addRoom: async (
      buildingId: number,
      room: {
        floor: number;
        no: number;
        status: number;
        area: number | string;
        description: string;
        images: UploadFile[];
      }
    ): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      const formData = new FormData();
      formData.append('floor', room.floor.toString());
      formData.append('no', room.no.toString());
      formData.append('status', room.status.toString());
      formData.append('area', room.area.toString());
      formData.append('description', room.description);
      room.images.forEach((image) => {
        formData.append('images[]', image.originFileObj as File);
      });

      return $api(apiRoutes.building.addRoom(buildingId), {
        method: 'POST',
        body: formData,
      });
    },
    getSchedule(buildingID: number): Promise<APIResponse<ManagerSchedule[]>> {
      const $api = getApiInstance();
      return $api(apiRoutes.building.getSchedule(buildingID), {
        method: 'GET',
      });
    },
    updateBuilding(buildingID: number, data: EditBuilding): Promise<APIResponse<null>> {
      const $api = getApiInstance();
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('address', data.address);
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
              price: service.price,
            })
          );
        } else {
          formData.append(
            'services[]',
            JSON.stringify({
              ID: service.ID,
              name: service.name,
              price: service.price,
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
              startDate: convertToDate(schedule.start_date.toDate().toISOString()),
              endDate: schedule.end_date ? convertToDate((schedule.end_date as Dayjs).toDate().toISOString()) : null,
            })
          );
        } else {
          formData.append(
            'schedules[]',
            JSON.stringify({
              ID: schedule.ID,
              managerID: schedule.managerID,
              startDate: convertToDate(schedule.start_date.toDate().toISOString()),
              endDate: schedule.end_date ? convertToDate((schedule.end_date as Dayjs).toDate().toISOString()) : null,
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
              area: room.area,
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
              ID: room.ID,
              floor: room.floor,
              no: room.no,
              status: room.status,
              area: room.area,
              description: room.description,
            })
          );
          room.images.forEach((image) => {
            if (image.isDeleted) {
              formData.append('deleteRoomImages[]', (image as RoomImage).ID.toString());
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
