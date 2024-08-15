import { Schema, model, Model } from 'mongoose';
import { IAuditTrail } from '@/types/audiTrailInteface';

const AuditTrailSchema = new Schema({
  user: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

export const createAuditTrail = (
  collectionName: string,
): Model<IAuditTrail> => {
  return model<IAuditTrail>(collectionName, AuditTrailSchema);
};
