import { useNuxtApp } from '#app';
import type { APIResponse } from '~/types/api_response';
import { apiRoutes } from '~/consts/api_routes';
import type { Building, NewBuildingInfo, Room, Service } from '~/types/building';
import type { UploadFile } from 'ant-design-vue';

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
  },
  room: {},
  profile: {},
  staff: {},
  customer: {},
  bill: {},
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
