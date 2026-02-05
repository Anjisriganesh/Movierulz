import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { Movie } from "../models/Movie.js";

const router = express.Router();

// Multer memory storage (Cloudinary కోసం)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 👉 POST /api/movies
router.post(
  "/",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        title,
        genre,
        description,
        times,
        price,
        duration,
        language,
        certificate,
        format,
      } = req.body;

      // ⏫ Upload poster to Cloudinary
      let posterUrl = "";
      if (req.files?.poster) {
        const posterUpload = await cloudinary.uploader.upload(
          `data:${req.files.poster[0].mimetype};base64,${req.files.poster[0].buffer.toString("base64")}`,
          { folder: "movies/posters" }
        );
        posterUrl = posterUpload.secure_url;
      }

      // ⏫ Upload banner to Cloudinary
      let bannerUrl = "";
      if (req.files?.banner) {
        const bannerUpload = await cloudinary.uploader.upload(
          `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString("base64")}`,
          { folder: "movies/banners" }
        );
        bannerUrl = bannerUpload.secure_url;
      }

      const movie = new Movie({
        title,
        genre,
        description,
        poster: posterUrl,
        banner: bannerUrl,
        times: JSON.parse(times),
        price: JSON.parse(price),
        duration,
        language,
        certificate,
        format,
      });

      await movie.save();
      res.json({ success: true, movie });
    } catch (err) {
      console.error("Movie upload error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// 👉 GET /api/movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
