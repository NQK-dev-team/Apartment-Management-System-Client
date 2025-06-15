import type { BasicFileModel, BasicModel, NullTime, NullString } from './basic_model';
import type { Bill } from './bill';
import type { User } from './user';

type ContractFile = BasicFileModel & {
  contractID: number;
};

type RoomResident = BasicModel & {
  firstName: string;
  middleName: NullString;
  lastName: string;
  ssn: string;
  oldSSN: NullString;
  dob: string;
  pob: string;
  email: string;
  phone: string;
  gender: number;
  relationWithHouseholder: number | null;
  userAccountID: number | null;
  userAccount: User;
};

type Contract = BasicModel & {
  status: number; // 1: Active, 2: Expired, 3: Cancelled, 4: Waiting for signatures, 5: Not in effect yet
  value: number;
  type: number; // 1: Rent, 2: Buy
  startDate: string;
  endDate: NullTime;
  signDate: NullTime;
  creatorID: number;
  creator: User;
  householderID: number;
  householder: User;
  roomID: number;
  files: ContractFile[];
  bills: Bill[];
  residents: RoomResident[];
  roomNo: undefined | number;
  buildingName: undefined | string;
  buildingAddress: undefined | string;
  roomFloor: undefined | number;
};

export type { Contract, ContractFile, RoomResident };
