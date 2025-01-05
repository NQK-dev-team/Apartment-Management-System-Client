import { jwtStore } from '~/stores/token';
import type { RuntimeConfig } from 'nuxt/schema';
import type { APITokenResponse } from '~/types/api_response';

function getServerBaseUrl(): string {
  const config: RuntimeConfig = useRuntimeConfig();
  let apiUrl = (config.public.apiBaseURL as string) || '';
  const apiPrefix = (config.public.apiPrefix as string) || '';
  const apiVersion = (config.public.apiVersion as string) || '';
  apiUrl = apiUrl + (apiPrefix ? '/' + apiPrefix : '') + (apiVersion ? '/' + apiVersion : '');

  return apiUrl;
}

async function verifyToken(token: string): Promise<boolean> {
  // Verify the token
  const response = await fetch(getServerBaseUrl() + '/authentication/verify-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json, multipart/form-data, image/*',
      Accept: 'application/json, image/*',
    },
    body: JSON.stringify({ jwtToken: token }),
  });

  const body: APITokenResponse<boolean> = await response.json();

  return body.data;
}

async function getNewToken(refreshToken: string): Promise<string> {
  // Get a new token
  const response = await fetch(getServerBaseUrl() + '/authentication/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json, multipart/form-data, image/*',
      Accept: 'application/json, image/*',
    },
    body: JSON.stringify({ refreshToken }),
  });

  const body: APITokenResponse<null> = await response.json();

  return body.jwtToken;
}

function storeToken(token: string) {
  // Store the token
  const jwtPayload = token.split('.')[1];
  const json = JSON.parse(Buffer.from(jwtPayload, 'base64url').toString('utf8'));
  const tokenStore = jwtStore();
  tokenStore.setStorage(json.fullName, json.imagePath, json.isOwner, json.isManager, json.isCustomer, json.userID);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware(async (to, from) => {
  // skip middleware on client side entirely
  if (import.meta.client) return;

  const config: RuntimeConfig = useRuntimeConfig();
  const jwt = useCookie('jwt', {
    httpOnly: true,
    secure: config.public.isHttps,
    sameSite: 'strict',
  });
  const refreshToken = useCookie('refreshToken', {
    httpOnly: true,
    secure: config.public.isHttps,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
  });
  const nonAuthRoutes = ['/login', '/forgot-password', '/reset-password'];
  if (jwt && jwt.value) {
    if (!(await verifyToken(jwt.value))) {
      if (refreshToken && refreshToken.value) {
        const newToken = await getNewToken(refreshToken.value);
        if (newToken) {
          jwt.value = newToken;
          storeToken(newToken);
        } else if (!nonAuthRoutes.includes(to.path)) {
          return navigateTo('/login');
        }
      } else if (!nonAuthRoutes.includes(to.path)) {
        return navigateTo('/login');
      }
    } else {
      storeToken(jwt.value);
    }
  } else {
    if (refreshToken && refreshToken.value) {
      const newToken = await getNewToken(refreshToken.value);
      if (newToken) {
        jwt.value = newToken;
        storeToken(newToken);
      } else if (!nonAuthRoutes.includes(to.path)) {
        return navigateTo('/login');
      }
    } else if (!nonAuthRoutes.includes(to.path)) {
      return navigateTo('/login');
    }
  }
});
