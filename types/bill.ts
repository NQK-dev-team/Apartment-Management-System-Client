import type { BasicModel, NullInt64, NullString, NullTime } from './basic_model';
import type { User } from './user';
import type { Contract } from './contract';
import type { Building } from './building';

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
};

export type { Bill, Service, BillPayment, UpdateBill };
