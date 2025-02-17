interface UploadFile extends File {
  uid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originFileObj: any;
}

export type { UploadFile };
