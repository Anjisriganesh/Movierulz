import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; // ✅ use your API instance

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Use API instead of axios
      const res = await API.post("/api/auth/login", { email, password });

      if (res.data.success) {
        // Save user info in localStorage
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("userName", res.data.user.name);

        // Redirect to home
        navigate("/");
      } else {
        setMessage(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container3">
      <h2>Login</h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          margin: "20px auto",
        }}
      >
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
            background: "red",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {/* Show error message */}
      {message && <p style={{ color: "red", textAlign: "center" }}>{message}</p>}

      {/* Link to register */}
      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "6px 12px",
            background: "green",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </p>
    </div>
  );
}
