import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  showId: { type: mongoose.Schema.Types.ObjectId, ref: "Show" },
  seats: [String],
  totalPrice: Number,
  bookedAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model("Booking", bookingSchema);