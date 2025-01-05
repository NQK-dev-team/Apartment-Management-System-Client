import mitt from 'mitt';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export default defineNuxtPlugin((nuxtApp) => {
  const event = mitt();

  return {
    provide: {
      event,
    },
  };
});
