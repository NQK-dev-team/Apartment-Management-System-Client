import type { BasicModel } from './basic_model';
import type { UploadFile } from './upload_file';
import type { User } from './user';
import type { Room } from './building';

type Contract = BasicModel &{
    status: number;                // 1: Active, 2: Expired, 3: Cancelled, 4: Waiting for signatures, 5: Not in effect yet
    value: number;                 // Float value (number in TypeScript)
    type: number;                  // 1: Rent, 2: Buy
    startDate: string;             // Date in ISO string format (or you could use Date if you're using JavaScript Date objects)
    endDate?: string | null;       // Date in ISO string format (nullable)
    signDate: string;              // Date in ISO string format (or you could use Date if you're using JavaScript Date objects)
    creatorID: number;             // Creator's ID (int64 -> number in TypeScript)
    creator: User;            // Creator (foreign key relationship)
    householderID: number;        // Householder's ID (int64 -> number in TypeScript)
    householder: User;       // Householder (foreign key relationship)
    roomID: number;               // Room ID (int64 -> number in TypeScript)
    buildingID: number;           // Building ID (int64 -> number in TypeScript)
    room: Room;              // Room (foreign key relationship)
  }

  export type { Contract };