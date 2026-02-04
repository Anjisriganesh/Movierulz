// pages/Home.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard.js";
import Banner from "../components/Banner.js";
import MovieSlider from "./MovieSlider.js";
import Premieres from "../components/Premieres.js";
import LiveEvents from "../components/LiveEvents.js";
import Footer from "../components/Footer.js";
import API from "../utils/api.js"

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Hyderabad");
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  // Get user info from localStorage
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  // Banner images
  const banners = [
    "/banners/movie2.jpg",
    "/banners/banner7.jpg",
    "/banners/banner10.jpg"
  ];

  // Load movies from backend
  useEffect(() => {
  API.get("/api/movies")
    .then(res => setMovies(res.data))
    .catch(err => console.error("Movies API error:", err));
}, []);

  // Filter movies by search
  const filteredMovies = movies.filter(m =>
    (m.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`container ${darkMode ? "" : "light"}`}>
      {/* Header */}
      <header className="header">
        <div className="left-section">
          <h1 className="logo">MovieRulz</h1>
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
      <div className="location-box">
    <span className="location-icon">✈️</span>
    <select
      className="location-select"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    >
      <option>Palakollu</option>
      <option>Medapadu</option>
      <option>Bhimavaram</option>
      <option>Hyderabad</option>
      <option>Vizag</option>
    </select>
  </div>
  
    <span className="username1">👤 {userName}</span>
  
  {userId ? (
    <div className="user-actions">
      
      <button className="mybookings-btn" onClick={() => navigate("/my-bookings")}>
       Bookings
      </button>

      <button className="logout-btn" onClick={() => { localStorage.clear(); navigate("/"); }}>
        Logout
      </button>
    </div>
  ) : (
    <button className="signin-btn" onClick={() => navigate("/login")}>
      Sign In
    </button>
  )}
  <button
    className="toggle-btn"
    onClick={() => setDarkMode(!darkMode)}
  >
    {darkMode ? "☀️" : "🌙"}
  </button>
</div>

      
        

        
      </header>

      {/* Banner slider */}
      <Banner images={banners} />

      {/* Movies */}
      <h2>Now Showing</h2>
      <MovieSlider movies={filteredMovies.slice(0, 10)} rows={2} />

      <div className="movie-grid">
        {filteredMovies.slice(10).map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <Premieres />
      <LiveEvents />
      <Footer />
    </div>
  );
}
