import { roles } from '~/consts/roles';

/* eslint-disable @typescript-eslint/no-unused-vars */
export default defineNuxtRouteMiddleware((to, from) => {
  // skip middleware on client side entirely
  if (import.meta.client) return;
  const tokenStore = jwtStore();
  const role = tokenStore.getRole;

  if (role !== roles.manager && role !== roles.owner) {
    return abortNavigation();
  }
});
