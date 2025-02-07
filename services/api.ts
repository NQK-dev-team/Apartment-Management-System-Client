import { useNuxtApp } from '#app';
import type { APIResponse } from '~/types/api_response';
import { apiRoutes } from '~/consts/api_routes';
import type { Building, Room } from '~/types/building';

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
