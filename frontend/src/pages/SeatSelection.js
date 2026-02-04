import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showId, tickets } = location.state || {};

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  // 🔹 Fetch show + booked seats
  const fetchShow = useCallback(async () => {
    try {
      const res = await api.get(`/api/shows/show/${showId}`);
      setShow(res.data);

      const bookedRes = await api.get(
        `/api/bookings/booked-seats/${showId}`
      );
      setBookedSeats(bookedRes.data.bookedSeats || []);
    } catch (err) {
      console.error("Fetch show error:", err);
    }
  }, [showId]);

  useEffect(() => {
    if (showId) {
      fetchShow();
    }
  }, [fetchShow, showId]);

  // 🔹 Seat select / unselect
  const toggleSeat = (seatNumber) => {
    const isBooked = bookedSeats.includes(seatNumber);
    if (isBooked) return;

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

  // 🔹 Book tickets
  const bookTickets = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      if (!selectedSeats.length) {
        alert("Please select seats");
        return;
      }

      await api.post("/api/bookings", {
        userId,
        movieId: movie._id,
        showId,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * 150,
      });

      alert("🎉 Booking successful!");
      setSelectedSeats([]);
      fetchShow();
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Booking failed!");
    }
  };

  if (!show) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "10px",
          padding: "8px 16px",
          cursor: "pointer"
        }}
      >
        ⬅ Back
      </button>

      <h2>Select Seats for 🎬 {movie?.title}</h2>

      {/* 🎟️ Seats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${show.cols || 6}, 42px)`,
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
                width: "42px",
                height: "42px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isBooked ? "not-allowed" : "pointer",
                backgroundColor: isBooked
                  ? "#d32f2f"
                  : isSelected
                  ? "#2e7d32"
                  : "#9e9e9e",
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
        <strong>Selected Seats:</strong>{" "}
        {selectedSeats.join(", ") || "None"}
      </p>

      <p>
        <strong>Total Amount:</strong> ₹{selectedSeats.length * 150}
      </p>

      <button
        onClick={bookTickets}
        disabled={selectedSeats.length === 0}
        style={{
          marginTop: "15px",
          padding: "12px 24px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Book Tickets 🎟️
      </button>
    </div>
  );
}
