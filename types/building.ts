import type { BasicModel } from './basic_model';

type Building = BasicModel & {
  name: string;
  address: string;
  totalFloor: number;
  totalRoom: number;
};

type Room = BasicModel & {
  no: number;
  floor: number;
  description: string;
  area: number;
  status: number;
  buildingID: number;
};

export type { Building, Room };
