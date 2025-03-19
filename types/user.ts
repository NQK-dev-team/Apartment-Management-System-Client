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
  pob?: string;
  email: string;
  phone: string;
  ssnFrontFilePath: string;
  ssnBackFilePath: string;
  profileFilePath: string;
  emailVerifiedAt: NullTime;
  isOwner: boolean;
  isManager: boolean;
  isCustomer: boolean;
};

type ManagerSchedule = BasicModel & {
  startDate: string | Dayjs;
  endDate: NullTime | Dayjs;
  managerID: number;
  manager: User;
  buildingID: number;
  building: Building;
};

export type { User, ManagerSchedule };
