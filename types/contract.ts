import type { Dayjs } from 'dayjs';
import type { BasicFileModel, BasicModel, NullTime, NullString, NullInt64 } from './basic_model';
import type { Bill } from './bill';
import type { User } from './user';
// import type { UploadFile } from 'ant-design-vue';

type ContractFile = BasicFileModel & {
  contractID: number;
  isNew: boolean | undefined;
};

// type ContractFile = {
//   ID: number;
//   createdAt: string;
//   createdBy: number;
//   // deletedAt: string | null;
//   // deletedBy: number | null;
//   no: number | null;
//   path: string | UploadFile;
//   title: string | null;
//   contractID: number;
//   isNew: boolean | undefined;
// };

type RoomResident = BasicModel & {
  firstName: string;
  middleName: NullString;
  lastName: string;
  ssn: string;
  oldSSN: NullString;
  dob: string | Dayjs;
  pob: string;
  email: NullString;
  phone: NullString;
  gender: number;
  relationWithHouseholder: number;
  userAccountID: NullInt64;
  userAccount: User | undefined;
  isNew: boolean | undefined;
  isDeleted: boolean | undefined;
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
  newSignDate: undefined | string | Dayjs;
};

export type { Contract, ContractFile, RoomResident };
