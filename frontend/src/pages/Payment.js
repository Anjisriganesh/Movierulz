import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { movie, seats } = location.state || {};

  if (!movie || !seats) {
    return <p style={{ textAlign: "center" }}>Payment details not found</p>;
  }

  // 🔹 Check login
  const userId = localStorage.getItem("userId");

  const handlePayment = async () => {
    if (!userId) {
      alert("Please sign in to make payment!");
      navigate("/login", {
        state: {
          redirectAfterLogin: "/payment",
          movie,
          seats,
        },
      });
      return;
    }

    // 🔹 Simulated payment success
    const paymentId = "PAY" + Date.now();
    const amount = seats.length * 200;

    try {
      // ✅ SAVE BOOKING TO BACKEND
      await axios.post("https://movierulzg.onrender.com/api/tickets/book", {
        userId,
        movieId: movie._id,
        movieTitle: movie.title,
        poster: movie.poster,
        seats,
        amount,
        showTime: "6:00 PM",
        theatre: "PVR Cinemas",
        paymentId,
        status: "Booked",
      });

      alert("Payment Successful 🎉");

      navigate("/ticket", {
        state: {
          movie,
          seats,
          paymentId,
          showTime: "6:00 PM",
          theatre: "PVR Cinemas",
          amount,
          status: "Booked",
        },
      });
    } catch (error) {
      console.error("Booking save failed:", error);
      alert("Payment succeeded but booking could not be saved!");
    }
  };

  return (
    <div className="container">
      <button className="back-btn1" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h2>💳 Payment</h2>

      <p>
        <strong>Movie:</strong> {movie.title}
      </p>
      <p>
        <strong>Seats:</strong> {seats.join(", ")}
      </p>
      <p>
        <strong>Total Amount:</strong> ₹{seats.length * 200}
      </p>

      <button
        onClick={handlePayment}
        style={{
          padding: "12px 24px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "6px",
          marginTop: "20px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}
