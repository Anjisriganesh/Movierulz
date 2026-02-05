import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import showRoute from "./routes/showRoute.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000", // local frontend
      "https://jade-biscotti-26b01c.netlify.app" // deployed frontend
    ],
    credentials: true, // allow cookies if needed
  })
);





app.use(express.json());   
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

connectDB();

app.use("/api/upload", uploadRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/shows", showRoute);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
