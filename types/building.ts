import type { BasicFileModel, BasicModel } from './basic_model';
import type { UploadFile } from 'ant-design-vue';

type BuildingImage = BasicFileModel & {
  buildingID: number;
};

type Building = BasicModel & {
  name: string;
  address: string;
  totalFloor: number;
  totalRoom: number;
  images: BuildingImage[];
  rooms: Room[];
  services: Service[];
};

type Room = BasicModel & {
  no: number;
  floor: number;
  description: string;
  area: number;
  status: number;
  buildingID: number;
};

type Service = BasicModel & {
  buildingID: number;
  name: string;
  price: number;
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
  schedules: {
    managerID: number;
    managerNo: string | undefined;
    start: string | undefined;
    end: string | undefined;
  }[];
};

export type { Building, Room, Service, BuildingImage, NewBuildingInfo };
