import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Booking() {
  const { state } = useLocation();
  const movie = state?.movie;
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!movie) return <p>Movie not found</p>;

  const rows = ["A", "B", "C", "D", "E"];
  const seatsPerRow = 10;

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      alert("You can select maximum 6 seats");
    }
  };

  const confirmBooking = () => {
    navigate("/payment", {
      state: {
        movie,
        seats: selectedSeats
      }
    });
  };

  return (
    <div className="container">
      <h2>{movie.title}</h2>

      {/* 🎥 Screen */}
      <div style={{ background: "#ccc", height: "30px", margin: "20px auto", width: "60%", textAlign: "center", borderRadius: "6px" }}>
        SCREEN THIS WAY
      </div>

      {/* 🪑 Seats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 40px)", gap: "8px", justifyContent: "center" }}>
        {rows.map((row) =>
          Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((number) => {
            const seatId = `${row}${number}`;
            const isBooked = movie.seats?.find((s) => s.row === row && s.number === number)?.booked;

            return (
              <div
                key={seatId}
                onClick={() => !isBooked && toggleSeat(seatId)}
                style={{
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  lineHeight: "40px",
                  borderRadius: "6px",
                  cursor: isBooked ? "not-allowed" : "pointer",
                  backgroundColor: selectedSeats.includes(seatId)
                    ? "green"
                    : isBooked
                    ? "red"
                    : "#ddd"
                }}
              >
                {number}
              </div>
            );
          })
        )}
      </div>

      {/* 🎫 Selected seats */}
      <p style={{ marginTop: "20px" }}>
        Selected Seats: {selectedSeats.join(", ") || "None"}
      </p>

      <button
        disabled={selectedSeats.length === 0}
        onClick={confirmBooking}
        style={{
          padding: "12px 24px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "6px",
          marginTop: "10px",
          cursor: "pointer"
        }}
      >
        Proceed to Payment
      </button>
    </div>
  );
}
