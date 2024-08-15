import { Document } from 'mongoose';

export interface IAuditTrail extends Document {
  _id: string;
  user: string;
  action: string;
  timestamp: Date;
}
