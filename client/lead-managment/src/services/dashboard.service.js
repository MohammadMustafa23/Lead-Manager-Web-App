import api from "./api";

export async function getDashboard() {
  const response = await api.get("/leads/dashboard");
  return response.data;
}