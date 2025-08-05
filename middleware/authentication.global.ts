import type { RuntimeConfig } from 'nuxt/schema';
import type { APITokenResponse } from '~/types/api_response';
import { pageRoutes } from '~/consts/page_routes';
import { apiRoutes } from '~/consts/api_routes';
import { roles } from '~/consts/roles';
import { COMMON } from '~/consts/common';
// import { getRoleFromJWT, getUserIDFromJWT } from '~/utils/jwt';

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
  const response = await fetch(getServerBaseUrl() + apiRoutes.authentication.verifyToken, {
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

async function getNewToken(refreshToken: string): Promise<APITokenResponse<null> | null> {
  // Get a new token
  const response = await fetch(getServerBaseUrl() + apiRoutes.authentication.refreshToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json, multipart/form-data, image/*',
      Accept: 'application/json, image/*',
    },
    body: JSON.stringify({ refreshToken }),
  });

  const body: APITokenResponse<null> = await response.json();

  if (body.status && body.status !== COMMON.HTTP_STATUS.OK) {
    return null;
  }

  return body;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware(async (to, from) => {
  // skip middleware on client side entirely
  if (import.meta.client) return;

  let isJWTValid = false;
  const config: RuntimeConfig = useRuntimeConfig();
  const jwt = useCookie('jwt', {
    httpOnly: true,
    secure: config.public.isHttps,
    sameSite: 'lax',
  });
  const refreshToken = useCookie('refreshToken', {
    httpOnly: true,
    secure: config.public.isHttps,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
  });
  const userRole = useCookie('userRole', {
    httpOnly: false,
    secure: config.public.isHttps,
    sameSite: 'lax',
  });
  const userName = useCookie('userName', {
    httpOnly: false,
    secure: config.public.isHttps,
    sameSite: 'lax',
  });
  const userImage = useCookie('userImage', {
    httpOnly: false,
    secure: config.public.isHttps,
    sameSite: 'lax',
  });
  const userID = useCookie('userID', {
    httpOnly: false,
    secure: config.public.isHttps,
    sameSite: 'lax',
  });
  const userNo = useCookie('userNo', {
    httpOnly: false,
    secure: config.public.isHttps,
    sameSite: 'lax',
  });
  const nonAuthRoutes = Object.values(pageRoutes.authentication);
  if (jwt && jwt.value) {
    if (!(await verifyToken(jwt.value))) {
      if (refreshToken && refreshToken.value) {
        const newToken: APITokenResponse<null> | null = await getNewToken(refreshToken.value);
        if (newToken) {
          jwt.value = newToken.jwtToken;
          userRole.value = getRoleFromJWT(newToken.jwtToken);
          userName.value = getUserNameFromJWT(newToken.jwtToken);
          userImage.value = getUserImageFromJWT(newToken.jwtToken);
          userID.value = getUserIDFromJWT(newToken.jwtToken);
          userNo.value = getUserNoFromJWT(newToken.jwtToken);
          isJWTValid = true;
          refreshToken.value = newToken.refreshToken || refreshToken.value; // Update refresh token if available
        } else if (!nonAuthRoutes.includes(to.path)) {
          return navigateTo(pageRoutes.authentication.login);
        }
      } else if (!nonAuthRoutes.includes(to.path)) {
        return navigateTo(pageRoutes.authentication.login);
      }
    } else {
      userRole.value = getRoleFromJWT(jwt.value);
      userName.value = getUserNameFromJWT(jwt.value);
      userImage.value = getUserImageFromJWT(jwt.value);
      userID.value = getUserIDFromJWT(jwt.value);
      userNo.value = getUserNoFromJWT(jwt.value);
      isJWTValid = true;
    }
  } else {
    if (refreshToken && refreshToken.value) {
      const newToken: APITokenResponse<null> | null = await getNewToken(refreshToken.value);
      if (newToken) {
        jwt.value = newToken.jwtToken;
        userRole.value = getRoleFromJWT(newToken.jwtToken);
        userName.value = getUserNameFromJWT(newToken.jwtToken);
        userImage.value = getUserImageFromJWT(newToken.jwtToken);
        userID.value = getUserIDFromJWT(newToken.jwtToken);
        userNo.value = getUserNoFromJWT(newToken.jwtToken);
        isJWTValid = true;
        refreshToken.value = newToken.refreshToken || refreshToken.value; // Update refresh token if available
      } else if (!nonAuthRoutes.includes(to.path)) {
        return navigateTo(pageRoutes.authentication.login);
      }
    } else if (!nonAuthRoutes.includes(to.path)) {
      return navigateTo(pageRoutes.authentication.login);
    }
  }

  if (nonAuthRoutes.includes(to.path) && isJWTValid) {
    const role = jwt && jwt.value ? getRoleFromJWT(jwt.value) : '';

    if (role === roles.owner || role === roles.manager) {
      return navigateTo(pageRoutes.common.building.list);
    } else if (role === roles.customer) {
      return navigateTo(pageRoutes.common.room.list);
    }
  }
});
