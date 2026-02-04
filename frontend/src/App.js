import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import "./App.css";
import AddMovie from "./pages/AddMovie";
import Booking from "./pages/Booking";
import Ticket from "./pages/Ticket";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Seats from "./pages/Seats";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/seats/:showId" element={<SeatSelection />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seats" element={<Seats/>}/>

        
      </Routes>
    </Router>
  );
}

export default App;