import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  time: String,
  theater: String,
  seats: [
    {
      seatNumber: String,
      isBooked: { type: Boolean, default: false } // ✅ important
    }
  ]
});

export const Show = mongoose.model("Show", showSchema);