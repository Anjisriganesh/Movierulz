import { useRef } from "react";
import MovieCard from "../components/MovieCard.js";

export default function MovieSlider({ movies }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -300,
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth"
    });
  };

  return (
    <div className="movie-slider-container">
      <button className="slider-arrow left" onClick={scrollLeft}>
        ‹
      </button>

      <div className="movie-slider" ref={sliderRef}>
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <button className="slider-arrow right" onClick={scrollRight}>
        ›
      </button>
    </div>
  );
}
