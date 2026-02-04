import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Seats() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, tickets } = location.state;

  const rows = 5;
  const cols = 6;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      if (selectedSeats.length < tickets) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const handlePayment = () => {
    // Navigate to payment / ticket page
    navigate("/ticket", { state: { movie, selectedSeats } });
  };

  return (
    <div>
      <h1>Select Seats for {movie.title}</h1>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 40px)`, gap: "10px" }}>
        {Array.from({ length: rows * cols }, (_, i) => i + 1).map((seat) => (
          <div
            key={seat}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: selectedSeats.includes(seat) ? "green" : "#ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "4px",
            }}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </div>
        ))}
      </div>

      <button onClick={handlePayment} style={{ marginTop: "20px" }}>
        Proceed to Payment
      </button>
      
    </div>
  );
}
