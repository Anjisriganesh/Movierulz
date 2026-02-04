import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; 

export default function MyBookings() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [tickets, setTickets] = useState([]);

  const fetchTickets = useCallback(async () => {
    try {
      const res = await API.get(`/api/tickets/my/${userId}`);
      setTickets(res.data.tickets);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const cancelTicket = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await API.put(`/api/tickets/cancel/${id}`);
      setTickets(tickets.map(t =>
        t._id === id ? { ...t, status: "Cancelled" } : t
      ));
      alert("Booking cancelled successfully!");
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Cancel failed");
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate("/")} className="back-btn">
        ⬅ Back to Home
      </button>

      <h2>🎟️ My Bookings</h2>

      {tickets.length === 0 && <p>No bookings yet.</p>}

      {tickets.map(ticket => (
        <div key={ticket._id} className="booking-card">
          <img src={`${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}${ticket.poster}`} alt={ticket.movieTitle} />

          <div className="booking-info">
            <h3>{ticket.movieTitle}</h3>
            <p><strong>Seats:</strong> {ticket.seats.join(", ")}</p>
            <p><strong>Time:</strong> {ticket.showTime}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={ticket.status === "Cancelled" ? "status-cancelled" : "status-booked"}>
                {ticket.status}
              </span>
            </p>

            <div className="booking-actions">
              <button
                className="view-btn"
                disabled={ticket.status === "Cancelled"}
                onClick={() =>
                  ticket.status !== "Cancelled" &&
                  navigate("/ticket", {
                    state: {
                      movie: {
                        _id: ticket.movieId,
                        title: ticket.movieTitle,
                        poster: ticket.poster
                      },
                      seats: ticket.seats,
                      paymentId: ticket.paymentId,
                      showTime: ticket.showTime,
                      theatre: ticket.theatre,
                      amount: ticket.amount,
                      status: ticket.status
                    }
                  })
                }
              >
                {ticket.status === "Cancelled" ? "Ticket Cancelled ❌" : "View Ticket"}
              </button>

              {ticket.status === "Booked" && (
                <button
                  onClick={() => cancelTicket(ticket._id)}
                  className="cancel-btn"
                >
                  Cancel Booking ❌
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
