// ...imports same

export default function Ticket() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { movie, seats, paymentId, showTime, theatre, amount } = state || {};
  const userId = localStorage.getItem("userId");
  const finalAmount = amount ?? seats?.length * 200;

  const saveTicket = useCallback(async () => {
    if (!movie || !paymentId) return;

    try {
      await API.post("/api/tickets/save", {
        userId,
        movieId: movie._id,
        movieTitle: movie.title,
        poster: movie.poster, // Cloudinary URL
        seats,
        showTime,
        theatre,
        paymentId,
        amount: finalAmount,
        status: "Booked",
      });
    } catch (err) {
      console.error("Ticket save failed:", err);
    }
  }, [movie, paymentId, userId, seats, showTime, theatre, finalAmount]);

  useEffect(() => {
    saveTicket();
  }, [saveTicket]);

  if (!movie) return <p style={{ textAlign: "center" }}>Ticket not found</p>;

  const posterURL = movie.poster; // ✅ direct Cloudinary URL

  return (
    <div className="container">
      {/* UI same as yours */}
      <img src={posterURL} alt={movie.title} style={{ width: "100%", borderRadius: "8px" }} />
      {/* rest unchanged */}
    </div>
  );
}
