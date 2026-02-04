import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Seats() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]); // ✅ Move hook to top

  // 🔹 Safety check (refresh issue avoid)
  const { movie, tickets } = location.state || {};

  if (!movie || !tickets) {
    return <p style={{ textAlign: "center" }}>Seat data not found</p>;
  }

  const rows = 5;
  const cols = 6;

  // 🔹 Seat select / unselect
  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      if (selectedSeats.length < tickets) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        alert(`You can select only ${tickets} seats`);
      }
    }
  };

  // 🔹 Proceed to ticket / payment
  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select seats");
      return;
    }

    navigate("/ticket", {
      state: {
        movie,
        seats: selectedSeats,
        amount: selectedSeats.length * 200,
        showTime: "9:00 PM",
        theatre: "INOX Cinemas",
        paymentId: "PAY" + Date.now(),
      },
    });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: "10px" }}
      >
        ⬅ Back
      </button>

      <h1>Select Seats for 🎬 {movie.title}</h1>

      {/* 🎟️ Seats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 42px)`,
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {Array.from({ length: rows * cols }, (_, i) => i + 1).map((seat) => (
          <div
            key={seat}
            onClick={() => toggleSeat(seat)}
            style={{
              width: "42px",
              height: "42px",
              backgroundColor: selectedSeats.includes(seat)
                ? "#2e7d32"
                : "#bdbdbd",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            {seat}
          </div>
        ))}
      </div>

      <p style={{ marginTop: "15px" }}>
        <strong>Selected Seats:</strong>{" "}
        {selectedSeats.join(", ") || "None"}
      </p>

      <p>
        <strong>Total Amount:</strong> ₹{selectedSeats.length * 200}
      </p>

      <button
        onClick={handlePayment}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "green",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Proceed to Payment 💳
      </button>
    </div>
  );
}
