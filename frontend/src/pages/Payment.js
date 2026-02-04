import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { movie, seats } = state;

  // Check if user is logged in
  const userId = localStorage.getItem("userId");

  const handlePayment = () => {
    if (!userId) {
      // If not logged in, redirect to login page
      alert("Please sign in to make payment!");
      navigate("/login", {
        state: { movie, seats, redirectAfterLogin: "/payment" },
      });
      return;
    }

    // Simulate payment success for logged-in user
    const paymentId = "PAY" + Math.floor(Math.random() * 1000000);
    const amount = seats.length * 200;

    alert("Payment Successful 🎉");

    navigate("/ticket", {
      state: {
        movie,
        seats,
        paymentId,
        showTime: "6:00 PM",
        theatre: "PVR Cinemas",
        amount,
      },
    });
  };

  return (
    <div className="container">
      <button className="back-btn1" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h2>Payment</h2>
      <p><strong>Movie:</strong> {movie.title}</p>
      <p><strong>Seats:</strong> {seats.join(", ")}</p>
      <p><strong>Total Amount:</strong> ₹{seats.length * 200}</p>

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
        }}
      >
        Pay Now
      </button>
    </div>
  );
}
