import type { UploadFile } from 'ant-design-vue';
import type { Dayjs } from 'dayjs';

type BasicModel = {
  ID: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  // deletedAt: string | undefined;
  // deletedBy: number | undefined;
};

type BasicFileModel = {
  ID: number;
  createdAt: string;
  createdBy: number;
  // deletedAt: string | undefined;
  // deletedBy: number | undefined;
  no: number | undefined;
  path: string | UploadFile[];
  title: string | undefined;
};

type NullTime = {
  Time: string | undefined | Dayjs;
  Valid: boolean;
};

type NullString = {
  String: string | undefined;
  Valid: boolean;
};

type NullInt64 = {
  Int64: number | undefined;
  Valid: boolean;
};

export type { BasicModel, BasicFileModel, NullTime, NullString, NullInt64 };
