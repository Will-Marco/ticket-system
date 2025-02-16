import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    row: {
      type: String,
      required: true,
    },
    seat: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      min: 1,
    },
    showStartDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Ticket = mongoose.model('Ticket', ticketSchema);
