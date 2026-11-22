import axios from "axios";

console.log(process.env.API_URL);


const api = axios.create({
  baseURL: import.meta.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
