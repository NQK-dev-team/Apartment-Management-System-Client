type BasicModel = {
  ID: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  deletedAt: string | null;
  deletedBy: number | null;
};

type BasicFileModel = {
  ID: number;
  createdAt: string;
  createdBy: number;
  deletedAt: string | null;
  deletedBy: number | null;
  no: number | null;
  path: string;
  title: string | null;
};

export type { BasicModel, BasicFileModel };
