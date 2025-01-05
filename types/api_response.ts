/* eslint-disable @typescript-eslint/no-explicit-any */
type BaseAPIResponse = {
  message: string;
  validateError: any;
};

export type APIResponse<T> = BaseAPIResponse & {
  data: T;
};

export type APITokenResponse<T> = BaseAPIResponse & {
  jwtToken: string;
  refreshToken: string;
  data: T;
};
