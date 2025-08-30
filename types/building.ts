import type { BasicFileModel, BasicModel } from './basic_model';
import type { UploadFile } from 'ant-design-vue';
import type { Dayjs } from 'dayjs';
import type { Contract } from './contract';

type BuildingImage = BasicFileModel & {
  buildingID: number;
};

type RoomImage = BasicFileModel & {
  roomID: number;
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
  images: RoomImage[];
  contracts: Contract[];
  buildingName: undefined | string;
  buildingAddress: undefined | string;
};

type Service = BasicModel & {
  buildingID: number;
  name: string;
  price: number | string;
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

type EditRoom = BasicModel & {
  no: number;
  floor: number;
  description: string;
  area: number | string;
  status: number;
  buildingID: number;
  images: ((RoomImage | UploadFile) & {
    isDeleted: boolean;
    isNew: boolean;
  })[];
  isDeleted: boolean;
  isNew: boolean;
};

type EditBuildingImage = UploadFile | BuildingImage;
type EditManagerSchedule = BasicModel & {
  startDate: Dayjs;
  endDate: Dayjs | string;
  managerID: number;
  managerNo: string;
  buildingID: number;
  isDeleted: boolean;
  isNew: boolean;
};

type EditBuilding = BasicModel & {
  name: string;
  address: string;
  totalFloor: number;
  totalRoom: number;
  images: (EditBuildingImage & {
    isDeleted: boolean;
    isNew: boolean;
  })[];
  rooms: EditRoom[];
  services: (Service & {
    isDeleted: boolean;
    isNew: boolean;
  })[];
  schedules: EditManagerSchedule[];
};

type BuildingStatistic = {
  totalBuildings: number | undefined;
  totalRooms: number;
  totalRentedRooms: number;
  totalBoughtRooms: number;
  totalAvailableRooms: number;
  totalMaintenancedRooms: number;
  totalUnavailableRooms: number;
};

export type {
  Building,
  Room,
  Service,
  BuildingImage,
  NewBuildingInfo,
  EditRoom,
  EditBuilding,
  EditManagerSchedule,
  RoomImage,
  BuildingStatistic,
};
