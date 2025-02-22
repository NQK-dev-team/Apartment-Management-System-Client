import type { BasicModel } from './basic_model';
import type { UploadFile } from './upload_file';

type Building = BasicModel & {
  name: string;
  address: string;
  totalFloor: number;
  totalRoom: number;
  image: string[];
};

type Room = BasicModel & {
  no: number;
  floor: number;
  description: string;
  area: number;
  status: number;
  buildingID: number;
  building: Building;
};

type NewBuildingInfo = {
  name: string;
  address: string;
  images: UploadFile[];
  services: {
    name: string;
    price: number | string;
  }[];
  floors: {
    rooms: {
      status: number;
      area: number | string;
      description: string;
      images: UploadFile[];
    }[];
  }[];
};

export type { Building, Room, NewBuildingInfo };
