import type { BasicModel } from './basic_model';

type Building = BasicModel & {
  name: string;
  address: string;
  totalFloor: number;
  totalRoom: number;
};

export type { Building };
