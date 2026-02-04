import express from "express";
import { Show } from "../models/Show.js";

const router = express.Router();

// Get a show by ID
router.get("/show/:id", async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) return res.status(404).json({ message: "Show not found" });
    res.json(show);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch show" });
  }
});

export default router;
