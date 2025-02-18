import { useNuxtApp } from '#app';
import type { APIResponse } from '~/types/api_response';
import { apiRoutes } from '~/consts/api_routes';
import type { Building, NewBuildingInfo, Room } from '~/types/building';

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
    addNewBuilding: async (building: NewBuildingInfo): Promise<APIResponse<null>> => {
      const $api = getApiInstance();
      const formData = new FormData();

      formData.append('name', building.name);
      formData.append('address', building.address);
      building.services.forEach((service) => {
        formData.append('services[]', JSON.stringify(service));
      });
      building.managers.forEach((manager) => {
        formData.append('managers[]', JSON.stringify(manager));
      });
      building.images.forEach((image) => {
        formData.append('images[]', image);
      });
      building.floors.forEach((floor, floorIndex) => {
        floor.rooms.forEach((room, roomIndex) => {
          formData.append(
            'rooms[]',
            JSON.stringify({
              status: room.status,
              area: room.area,
              description: room.description,
              floor: floorIndex + 1,
            })
          );
          room.images.forEach((image) => {
            formData.append(`roomImages[${1000 * (floorIndex + 1) + roomIndex + 1}]`, image);
          });
        });
      });

      return $api(apiRoutes.building.add, {
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
