import type { BasicFileModel, BasicModel } from './basic_model';
import type { User } from './user';

type SupportTicketFile = BasicFileModel & {
  supportTicketID: number;
};

type SupportTicket = BasicModel & {
  status: number; // 1: Pending, 2: Approved, 3: Rejected
  title: string;
  content: string;
  contractID: number;
  customerID: number;
  customer: User;
  files: SupportTicketFile[];
};

type ManagerResolveTicket = {
  supportTicketID: number;
  supportTicket: SupportTicket;
  managerID: number;
  manager: User;
  result: number; // 0: Rejected, 1: Approved
  resolveTime: string;
};

export type { SupportTicket, ManagerResolveTicket };
