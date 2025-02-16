import mongoose, { Schema } from 'mongoose';

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps: true }
);

export const Customer = mongoose.model('Customer', customerSchema);
