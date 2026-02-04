import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie._id}`, { state: { movie } })}>
      <img
        src={`https://movierulzg.onrender.com${movie.poster}`}
        alt={movie.title}
        style={{ width: "150px", height: "220px", objectFit: "cover" }}
      />
      <h4>{movie.title}</h4>
      <p>{movie.genre}</p>
    </div>
  );
}
