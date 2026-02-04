import axios from "axios";

const API = axios.create({
  baseURL: "https://movierulzg.onrender.com", 
  withCredentials: true, 
});

export default API;
