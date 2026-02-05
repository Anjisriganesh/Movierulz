import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "https://movierulz-z0q0.onrender.com";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

export default API;
