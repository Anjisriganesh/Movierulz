import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showId, tickets } = location.state;

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const fetchShow = useCallback(async () => {
    try {
      const res = await axios.get(`https://movierulz-z0q0.onrender.com/api/shows/show/${showId}`);
      setShow(res.data);

      const bookedRes = await axios.get(`https://movierulz-z0q0.onrender.com/api/bookings/booked-seats/${showId}`);
      setBookedSeats(bookedRes.data.bookedSeats);
    } catch (err) {
      console.error("Fetch show error:", err);
    }
  }, [showId]);

  useEffect(() => {
    fetchShow();
  }, [fetchShow]);

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      if (selectedSeats.length < tickets) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const bookTickets = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      if (!selectedSeats.length) return;

      await axios.post("https://movierulz-z0q0.onrender.com/api/bookings", {
        userId,
        movieId: movie._id,
        showId,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * 150,
      });

      alert("Booking successful!");
      setSelectedSeats([]);
      fetchShow();
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Booking failed!");
    }
  };

  if (!show) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Seats for {movie.title}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${show.cols || 6}, 40px)`,
          gap: "8px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {show.seats.map((seat) => {
          const isBooked = bookedSeats.includes(seat.seatNumber);
          const isSelected = selectedSeats.includes(seat.seatNumber);
          return (
            <div
              key={seat.seatNumber}
              onClick={() => toggleSeat(seat.seatNumber)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isBooked ? "not-allowed" : "pointer",
                backgroundColor: isBooked
                  ? "red"
                  : isSelected
                  ? "green"
                  : "#ccc",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              {seat.seatNumber}
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: "20px" }}>
        Selected Seats: {selectedSeats.join(", ") || "None"}
      </p>

      <button
        onClick={bookTickets}
        disabled={selectedSeats.length === 0}
        style={{
          marginTop: "15px",
          padding: "12px 20px",
          backgroundColor: "blue",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Book Tickets
      </button>
    </div>
  );
}
