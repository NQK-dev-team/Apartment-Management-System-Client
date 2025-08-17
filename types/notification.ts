import type { BasicFileModel, BasicModel } from './basic_model';
import type { User } from './user';

type NotificationFile = BasicFileModel & {
  notificationID: number;
  isDeleted: boolean | undefined;
};

type Notification = BasicModel & {
  title: string;
  content: string;
  sendTime: string;
  senderID: number;
  sender: User;
  isRead: number | undefined;
  isMarked: number | undefined;
  files: NotificationFile[];
  // receivers: number[] | undefined;
  // customerReceivers: number[] | undefined;
  // staffReceivers: number[] | undefined;
};

export type { Notification };
