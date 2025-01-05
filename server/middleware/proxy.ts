import type { RuntimeConfig } from 'nuxt/schema';
import { defineEventHandler, proxyRequest } from 'h3';

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
      'Content-Type': 'application/json, multipart/form-data, image/*',
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
        const clonedResponse = response.clone();
        const body = await clonedResponse.json();
        if (body.jwtToken) {
          setCookie(event, 'jwt', body.jwtToken, {
            httpOnly: true,
            secure: config.public.isHttps,
            sameSite: 'strict',
          });
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
        e.node.res.end(JSON.stringify(body));
      },
    });

    return response;
  }
});
