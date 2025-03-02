import type { BasicModel } from './basic_model';
import type { UploadFile } from './upload_file';

type User = BasicModel & {
  no: string; // "no" field as string (varchar(8))
  firstName: string; // "firstName" field as string (varchar(255))
  middleName?: string; // "middleName" field as string (optional)
  lastName: string; // "lastName" field as string (varchar(255))
  ssn: string; // "ssn" field as string (varchar(12))
  oldSSN?: string; // "oldSSN" field as string (optional)
  dob: string; // "dob" field as string (date)
  pob?: string; // "pob" field as string (optional)
  email: string; // "email" field as string (varchar(255))
  password: string; // "password" field as string (varchar(255))
  phone: string; // "phone" field as string (varchar(10))
  ssnFrontFilePath: string; // "ssnFrontFilePath" field as string (varchar(255))
  ssnBackFilePath: string; // "ssnBackFilePath" field as string (varchar(255))
  profileFilePath: string; // "profileFilePath" field as string (varchar(255))
  emailVerifiedAt?: string | null; // "emailVerifiedAt" field as string or null (timestamp)
  isOwner: boolean; // "isOwner" field as boolean
  isManager: boolean; // "isManager" field as boolean
  isCustomer: boolean; // "isCustomer" field as boolean
};

export type { User };
