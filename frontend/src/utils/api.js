import axios from "axios";

const API = axios.create({
  baseURL: "https://movierulz-z0q0.onrender.com", 
  withCredentials: true, 
});

export default API;
