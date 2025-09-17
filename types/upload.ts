import type { NullInt64, NullTime } from './basic_model';
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
  processDate: NullTime;
  processResult: NullInt64;
};

export type { Upload };
