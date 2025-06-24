import type { UploadFile } from 'ant-design-vue';

type BasicModel = {
  ID: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  // deletedAt: string | null;
  // deletedBy: number | null;
};

type BasicFileModel = {
  ID: number;
  createdAt: string;
  createdBy: number;
  // deletedAt: string | null;
  // deletedBy: number | null;
  no: number | null;
  path: string | UploadFile[];
  title: string | null;
};

type NullTime = {
  Time: string | null;
  Valid: boolean;
};

type NullString = {
  String: string | null;
  Valid: boolean;
};

type NullInt64 = {
  Int64: number | null;
  Valid: boolean;
};

export type { BasicModel, BasicFileModel, NullTime, NullString, NullInt64 };
