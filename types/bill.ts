import type { BasicModel, NullTime } from './basic_model';
import type { User } from './user';
import type { Contract } from './contract';
import type { Building } from './building';

type Bill = BasicModel & {
  period: string;
  status: number;
  note: string;
  paymentTime: NullTime;
  amount: number;
  payerID: number;
  payer: User;
  contractID: number;
  contract: Contract;
  title: string;
  totalAmountWithExtra: number;
  roomNo: number | undefined;
  buildingName: string | undefined;
  roomFloor: number | undefined;
};

type Service = BasicModel & {
  buildingID: number;
  building: Building;
  name: string;
  price: number;
};

export type { Bill, Service };
