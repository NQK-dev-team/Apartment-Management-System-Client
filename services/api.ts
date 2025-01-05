import { useNuxtApp } from '#app';
import type { APIResponse } from '~/types/api_response';

function getApiInstance() {
  const { $api } = useNuxtApp();
  return $api;
}

const authentication = {
  login: async (email: string, password: string, remember: boolean): Promise<APIResponse<null>> => {
    const $api = getApiInstance();
    return $api('/authentication/login', {
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
    return $api('/authentication/logout', {
      method: 'POST',
    });
  }
};

const api = {
  authentication,
};

export { api };
