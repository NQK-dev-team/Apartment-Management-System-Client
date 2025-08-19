import type { User } from './user';

type Upload = {
  ID: number;
  createdAt: string;
  creatorID: number;
  creator: User;
  fileName: string;
  urlPath: string;
  size: number;
  uploadType: number;
  processDate: string;
  processResult: number;
};

export type { Upload };
