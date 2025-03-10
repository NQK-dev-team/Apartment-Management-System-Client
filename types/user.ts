import type { BasicModel, NullTime } from './basic_model';
import type { Building } from './building';

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
  start_date: string;
  end_date: NullTime;
  manager_id: number;
  manager: User;
  building_id: number;
  building: Building;
};

export type { User, ManagerSchedule };
