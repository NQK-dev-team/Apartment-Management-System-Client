import type { BasicModel, NullTime } from './basic_model';
import type { Building } from './building';
import type { Dayjs } from 'dayjs';

type User = BasicModel & {
  no: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  ssn: string;
  oldSSN?: string;
  dob: string;
  pob: string;
  email: string;
  phone: string;
  ssnFrontFilePath: string;
  ssnBackFilePath: string;
  profileFilePath: string;
  emailVerifiedAt: NullTime;
  address: string;
  isOwner: boolean;
  isManager: boolean;
  isCustomer: boolean;
  gender: number;
};

type ManagerSchedule = BasicModel & {
  startDate: string | Dayjs;
  endDate: NullTime | Dayjs;
  managerID: number;
  manager: User;
  buildingID: number;
  building: Building;
};

type NewStaff = {
  firstName: string;
  middleName?: string;
  lastName: string;
  ssn: string;
  oldSSN?: string;
  dob: string;
  pob: string;
  email: string;
  phone: string;
  address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ssnFrontFilePath: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ssnBackFilePath: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileFilePath: any;
  gender: number | undefined;
  schedules: {
    ID: number;
    start: string | undefined;
    end: string | undefined;
    buildingID: number | undefined;
  }[];
};

type EditStaff = {
  data: {
    ID: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    ssn: string;
    oldSSN?: string;
    dob: Dayjs | string;
    pob: string;
    email: string;
    phone: string;
    address: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ssnFrontFilePath: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ssnBackFilePath: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profileFilePath: any;
    gender: number | undefined;
    schedules: {
      data: {
        ID: number;
        start: string | Dayjs;
        end: string | Dayjs;
        buildingID: number | undefined;
        isNew: boolean;
        isDeleted: boolean;
      }[];
    };
  };
};

export type { User, ManagerSchedule, NewStaff, EditStaff };
