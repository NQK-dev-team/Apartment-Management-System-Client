import type { BasicModel, NullInt64, NullString, NullTime } from './basic_model';
import type { User } from './user';
import type { Contract } from './contract';
import type { Building } from './building';
import type { Dayjs } from 'dayjs';

type BillPayment = BasicModel & {
  name: string;
  billID: number;
  amount: number;
  note: NullString;
  isDeleted: boolean | undefined;
};

type Bill = BasicModel & {
  period: string;
  status: number;
  note: NullString;
  paymentTime: NullTime;
  amount: number;
  payerID: NullInt64;
  payer: User;
  contractID: number;
  contract: Contract;
  title: string;
  roomNo: number | undefined;
  buildingName: string | undefined;
  roomFloor: number | undefined;
  billPayments: BillPayment[];
};

type Service = BasicModel & {
  buildingID: number;
  building: Building;
  name: string;
  price: number;
};

type UpdateBill = {
  title: string;
  status: number;
  note: string;
  payments: {
    ID: number;
    name: string;
    amount: number;
    note: string;
  }[];
  newPayments: {
    name: string;
    amount: number;
    note: string;
  }[];
  deletedPayments: number[];
  payerID: number;
  paymentTime: string;
};

type AddBill1 = {
  buildingID: number | undefined;
  floor: number | undefined;
  roomID: number | undefined;
  contractID: number | undefined;
  period: string;
  status: number | undefined;
  note: string;
  paymentTime: string | Dayjs;
  payerID: number | undefined;
  title: string;
  billPayments: BillPayment[];
};

type AddBill2 = {
  contractID: number;
  period: string;
  status: number;
  note: string;
  paymentTime: string;
  payerID: number;
  title: string;
  billPayments: {
    name: string;
    amount: number;
    note: string;
  }[];
};

export type { Bill, Service, BillPayment, UpdateBill, AddBill1, AddBill2 };
