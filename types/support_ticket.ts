import type { BasicFileModel, BasicModel, NullTime } from './basic_model';
import type { Contract } from './contract';
import type { User } from './user';
import type { UploadFile } from 'ant-design-vue';

type SupportTicketFile = BasicFileModel & {
  supportTicketID: number;
  isDeleted: undefined | boolean;
};

type SupportTicket = BasicModel & {
  status: number; // 1: Pending, 2: Approved, 3: Rejected
  title: string;
  content: string;
  contractID: number;
  contract: Contract;
  customerID: number;
  customer: User;
  files: SupportTicketFile[];
  managerID: number;
  manager: User;
  managerResult: number;
  managerResolveTime: NullTime;
  ownerID: number;
  owner: User;
  ownerResult: number;
  ownerResolveTime: NullTime;
  roomNo: number | undefined;
  buildingName: string | undefined;
  roomFloor: number | undefined;
  fileList: UploadFile[] | undefined;
};

type AddSupportTicket = {
  title: string;
  content: string;
  roomID: number | undefined;
  fileList: UploadFile[];
};

export type { SupportTicket, AddSupportTicket, SupportTicketFile };
