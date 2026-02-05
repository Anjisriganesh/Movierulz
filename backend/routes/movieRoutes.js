import express from "express";
import { Movie } from "../models/Movie.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      title,
      genre,
      description,
      poster,
      banner,
      times,
      price,
      duration,
      language,
      certificate,
      format
    } = req.body;

    const movie = new Movie({
      title,
      genre,
      description,
      poster,
      banner,
      times,
      price,
      duration,
      language,
      certificate,
      format
    });

    await movie.save();
    res.json({ success: true, movie });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
