import type { BasicModel, NullString, NullTime } from './basic_model';
import type { User } from './user';
import type { Contract } from './contract';
import type { Building } from './building';

type BillPayment = BasicModel & {
  name: string;
  billID: number;
  amount: number;
  note: NullString;
};

type Bill = BasicModel & {
  period: string;
  status: number;
  note: NullString;
  paymentTime: NullTime;
  amount: number;
  payerID: number;
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

export type { Bill, Service };
