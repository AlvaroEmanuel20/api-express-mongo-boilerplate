import mongoose from 'mongoose';
const { Schema } = mongoose;

const tokenSchema = new Schema(
  {
    tokenJwt: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['RESET_PASS', 'VERIFY_EMAIL', 'ACCESS_TOKEN'],
      required: true,
    },
    isBlackListed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Token = mongoose.model('Token', tokenSchema);
