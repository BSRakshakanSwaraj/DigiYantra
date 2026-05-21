import axios from "axios";

const api = axios.create({
  baseURL: "https://digiyantra.onrender.com",
});

export default api;