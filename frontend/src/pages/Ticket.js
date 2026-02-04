import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";

export default function Ticket() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { movie, seats, paymentId, showTime, theatre, amount } = state || {};

  const finalAmount = amount ?? seats?.length * 200;

  if (!movie) return <p style={{ textAlign: "center" }}>Ticket not found</p>;

  const downloadPDF = async () => {
    const ticketElement = document.getElementById("ticket");
    const canvas = await html2canvas(ticketElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, imgHeight);
    pdf.save("Movie_Ticket.pdf");
  };

  return (
    <div className="container">
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 18px",
          background: "green",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "10px"
        }}
      >
        ⬅ Back to Home
      </button>

      <h2>Your Ticket 🎟️</h2>

      <div
        id="ticket"
        style={{
          width: "320px",
          padding: "15px",
          borderRadius: "10px",
          background: "#111",
          color: "#fff",
          margin: "20px auto",
          textAlign: "center",
          fontFamily: "Arial"
        }}
      >
        <img
          src={`https://movierulzg.onrender.com${movie.poster}`}
          alt={movie.title}
          style={{ width: "100%", borderRadius: "8px" }}
        />

        <h3 style={{ margin: "10px 0" }}>{movie.title}</h3>
        <p><strong>Theatre:</strong> {theatre}</p>
        <p><strong>Show Time:</strong> {showTime}</p>
        <p><strong>Seats:</strong> {seats.join(", ")}</p>
        <p><strong>Payment ID:</strong> {paymentId}</p>
        <p><strong>Amount:</strong> ₹{finalAmount}</p>

        <div style={{ marginTop: "10px", background: "#fff", padding: "8px", borderRadius: "6px", display: "inline-block" }}>
          <QRCodeCanvas
            value={`Movie: ${movie.title}, Seats: ${seats.join(", ")}, Payment: ${paymentId}`}
            size={150}
          />
        </div>

        <p style={{ marginTop: "10px", fontSize: "12px", color: "#ccc" }}>
          Show this QR at theatre entrance
        </p>
      </div>

      <button
        onClick={downloadPDF}
        style={{
          padding: "12px 24px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "6px",
          marginTop: "20px",
          cursor: "pointer"
        }}
      >
        Download Ticket PDF
      </button>
    </div>
  );
}
