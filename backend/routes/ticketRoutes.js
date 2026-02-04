import express from "express";
import { Ticket } from "../models/Ticket.js";

const router = express.Router();

// Save ticket (prevents duplicate tickets for same paymentId)
router.post("/save", async (req, res) => {
  try {
    const { userId, paymentId } = req.body;

    // Check if ticket already exists for this payment
    const existingTicket = await Ticket.findOne({ userId, paymentId });
    if (existingTicket) {
      return res.status(200).json({ 
        success: true, 
        ticket: existingTicket, 
        message: "Ticket already saved"
      });
    }

    const ticket = new Ticket(req.body);
    await ticket.save();
    res.json({ success: true, ticket });
  } catch (err) {
    console.error("Ticket save error:", err);
    res.status(500).json({ success: false, message: "Ticket save failed" });
  }
});

// Get my bookings
router.get("/my/:userId", async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json({ success: true, tickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// Cancel booking
router.put("/cancel/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );
    res.json({ success: true, ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

export default router;
