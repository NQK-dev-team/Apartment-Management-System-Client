import type { RuntimeConfig } from 'nuxt/schema';
import { defineEventHandler, proxyRequest } from 'h3';
import { apiRoutes } from '~/consts/api_routes';
import { getRoleFromJWT, getUserNameFromJWT, getUserImageFromJWT } from '~/utils/jwt';

export default defineEventHandler(async (event) => {
  if (event._path?.includes('api')) {
    const config: RuntimeConfig = useRuntimeConfig();
    let apiUrl = (config.public.apiBaseURL as string) || '';
    const apiPrefix = (config.public.apiPrefix as string) || '';
    const apiVersion = (config.public.apiVersion as string) || '';
    apiUrl = apiUrl + (apiPrefix ? '/' + apiPrefix : '') + (apiVersion ? '/' + apiVersion : '');
    // Append the desired path to the API URL
    apiUrl += event.path.replace('/api', '');

    // Extract JWT from cookies
    const jwt = getCookie(event, 'jwt');
    const refreshToken = getCookie(event, 'refreshToken');

    // Set headers
    const headers: Record<string, string> = {
      // 'Content-Type': 'application/json, multipart/form-data, image/*',
      Accept: 'application/json, image/*',
    };
    if (jwt) {
      headers['Authorization'] = `Bearer ${jwt ?? ''}`;
    }
    if (refreshToken) {
      headers['X-Refresh-Token'] = refreshToken ?? '';
    }

    const response = await proxyRequest(event, apiUrl, {
      headers,
      onResponse: async (e, response) => {
        if (apiUrl.includes('images') || apiUrl.includes('files')) {
          return;
        }

        const clonedResponse = response.clone();
        const body = await clonedResponse.json();
        if (body.jwtToken) {
          setCookie(event, 'jwt', body.jwtToken, {
            httpOnly: true,
            secure: config.public.isHttps,
            sameSite: 'lax',
          });

          // if (event._path?.includes(apiRoutes.authentication.login)) {
          // Set the user role in the cookie
          setCookie(event, 'userRole', getRoleFromJWT(body.jwtToken), {
            secure: config.public.isHttps,
            sameSite: 'lax',
          });
          setCookie(event, 'userName', getUserNameFromJWT(body.jwtToken), {
            secure: config.public.isHttps,
            sameSite: 'lax',
          });
          setCookie(event, 'userImage', getUserImageFromJWT(body.jwtToken), {
            secure: config.public.isHttps,
            sameSite: 'lax',
          });
          // }
        }
        if (body.refreshToken) {
          setCookie(event, 'refreshToken', body.refreshToken, {
            httpOnly: true,
            secure: config.public.isHttps,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'strict',
          });
        }
        delete body.jwtToken;
        delete body.refreshToken;

        if (event._path?.includes(apiRoutes.authentication.logout)) {
          // Remove the JWT and refresh token from the cookies with setCookie
          setCookie(event, 'jwt', '', {
            httpOnly: true,
            secure: config.public.isHttps,
            sameSite: 'lax',
            maxAge: 0,
          });
          setCookie(event, 'refreshToken', '', {
            httpOnly: true,
            secure: config.public.isHttps,
            sameSite: 'lax',
            maxAge: 0,
          });
          setCookie(event, 'userRole', '', {
            secure: config.public.isHttps,
            sameSite: 'lax',
            maxAge: 0,
          });
          setCookie(event, 'userName', '', {
            secure: config.public.isHttps,
            sameSite: 'lax',
            maxAge: 0,
          });
          setCookie(event, 'userImage', '', {
            secure: config.public.isHttps,
            sameSite: 'lax',
            maxAge: 0,
          });
        }

        e.node.res.end(JSON.stringify(body));
      },
    });

    return response;
  }
});
