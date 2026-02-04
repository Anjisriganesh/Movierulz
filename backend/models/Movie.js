import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  poster: { type: String },
  banner: { type: String },

  times: { type: [String], default: [] }, // array of show times

  price: { 
    type: Object, 
    default: { A: 250, B: 180, C: 120 } 
  },

  duration: { type: String },   // example: "2h 44m"
  language: { type: String },   // example: "Telugu"
  certificate: { type: String },// example: "UA13+"
  format: { type: String }      // example: "2D, DOLBY CINEMA 2D"

}, { timestamps: true });

export const Movie = mongoose.model("Movie", movieSchema);
