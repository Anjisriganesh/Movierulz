import express from "express";
import { Booking } from "../models/Booking.js";
import { Show } from "../models/Show.js";

const router = express.Router();

// Book tickets
router.post("/", async (req, res) => {
  const { userId, movieId, showId, seats, totalPrice } = req.body;

  try {
    if (!userId || !movieId || !showId || !seats?.length || !totalPrice) {
      return res.status(400).json({ message: "Missing booking data" });
    }

    const show = await Show.findById(showId);
    if (!show) return res.status(404).json({ message: "Show not found" });

    const alreadyBooked = show.seats.filter(
      seat => seats.includes(seat.seatNumber) && seat.isBooked
    );

    if (alreadyBooked.length > 0) {
      return res.status(400).json({
        message: "Some seats already booked",
        conflictSeats: alreadyBooked.map(s => s.seatNumber)
      });
    }

    await Show.updateOne(
      { _id: showId },
      { $set: { "seats.$[elem].isBooked": true } },
      { arrayFilters: [{ "elem.seatNumber": { $in: seats } }] }
    );

    const booking = new Booking({ userId, movieId, showId, seats, totalPrice });
    await booking.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});

// Get booked seats for a show
router.get("/booked-seats/:showId", async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId);
    if (!show) return res.status(404).json({ message: "Show not found" });

    const bookedSeats = show.seats
      .filter(s => s.isBooked)
      .map(s => s.seatNumber);

    res.json({ bookedSeats });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch booked seats" });
  }
});

export default router;
