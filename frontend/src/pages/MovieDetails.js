import { useLocation, useNavigate } from "react-router-dom";

export default function MovieDetail() {
  const { state } = useLocation();
  const movie = state?.movie;
  const navigate = useNavigate();

  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="container">
      <img
        src={`${movie.banner || movie.poster}`}
        alt={movie.title}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
      />

      {/* Movie meta info after poster */}
      <p className="movie-meta">
  <span className="meta-item">{movie.duration || "2h 44m"}</span>
  <span className="meta-dot">•</span>

  <span className="meta-item">{movie.genre}</span>
  <span className="meta-dot">•</span>

  <span className="meta-item">{movie.certificate || "UA13+"}</span>
  <span className="meta-dot">•</span>

  <span className="meta-item">{movie.format || "2D, DOLBY CINEMA 2D"}</span>
  <span className="meta-dot">•</span>

  <span className="meta-item">{movie.language || "Telugu"}</span>
</p>


      <h2>{movie.title}</h2>
      <p><b>Genre:</b> {movie.genre}</p>
      <p><b>Story:</b> {movie.description || "Story not available"}</p>
      <p><b>Rating:</b> ⭐ {movie.rating || "4.5"}</p>
      <p><b>Likes:</b> ❤️ {movie.likes || "1200"}</p>

      <button
        style={{
          padding: "12px 20px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "6px",
          marginRight: "10px"
        }}
        onClick={() => navigate(`/booking/${movie._id}`, { state: { movie } })}
      >
        🎟️ Book Ticket
      </button>

      <button
        className="back-btn2"
        onClick={() => navigate(-1)}
        
      >
        ⬅ Back
      </button>
    </div>
  );
}
