function isLightMode(lightModeCookie: string | null | undefined): boolean {
  return lightModeCookie === null || lightModeCookie === undefined || parseInt(lightModeCookie) === 1;
}

export { isLightMode };
