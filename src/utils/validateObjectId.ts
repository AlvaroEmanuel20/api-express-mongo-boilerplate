import { Types } from 'mongoose';

export default function validateObjectId(value: string) {
  return Types.ObjectId.isValid(value);
}
