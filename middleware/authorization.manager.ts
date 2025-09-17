import { roles } from '~/consts/roles';

/* eslint-disable @typescript-eslint/no-unused-vars */
export default defineNuxtRouteMiddleware((to, from) => {
  // skip middleware on server side entirely
  if (import.meta.server) return;
  const userRoleCookie = useCookie('userRole');
  const userRole: string = userRoleCookie && userRoleCookie.value ? userRoleCookie.value.toString() : '';

  if (userRole !== roles.manager && userRole !== roles.owner) {
    // return abortNavigation();
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    });
  }
});
