// pages/Register.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://movierulzg.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        // Registration successful, redirect to login
        navigate("/login");
      } else {
        setMessage(res.data.message || "Registration failed");
      }
    } catch (err) {
      setMessage("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          margin: "20px auto",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            marginTop: "10px",
            background: "green",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>

      {/* Error or info message */}
      {message && <p style={{ color: "red", textAlign: "center" }}>{message}</p>}

      {/* Link to login */}
      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "6px 12px",
            background: "red",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
}
