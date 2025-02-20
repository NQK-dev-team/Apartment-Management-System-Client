interface UploadFile extends File {
  uid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originFileObj: File | any;
}

export type { UploadFile };
