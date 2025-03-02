import type { BasicModel } from './basic_model';
import type { UploadFile } from './upload_file';
import type { User } from './user';
import type { Contract } from './contract';

type Bill = BasicModel & {
  period: string;
  status: number;
  note: string;
  paymentTime: string;
  amount: number;
  payerID: number;
  payer: User;
  contractID: number;
  contract: Contract;
};

export type { Bill };