import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  movieTitle: String,
  poster: String,
  seats: [String],
  showTime: String,
  theatre: String,
  paymentId: String,
  amount: Number,
  status: { type: String, default: "Booked" }, // Booked | Cancelled
  createdAt: { type: Date, default: Date.now },
});
ticketSchema.index({ userId: 1, paymentId: 1 }, { unique: true });
export const Ticket = mongoose.model("Ticket", ticketSchema);
