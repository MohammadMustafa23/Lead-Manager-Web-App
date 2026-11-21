import api from "./api";

// Get all leads with optional search and status filters
export async function getLeads(search = "", status = "") {
  const response = await api.get("/api/leads/get-leads", {
    params: { search, status },
  });

  return response.data;
}

// Get a single lead
export async function getLeadById(id) {
  const response = await api.get(`/api/leads/get-lead/${id}`);

  return response.data;
}

// Create a lead
export async function createLead(leadData) {
  const response = await api.post("/api/leads/create-lead", leadData);

  return response.data;
}

// Update a lead
export async function updateLead(id, leadData) {
  const response = await api.put(`/api/leads/update-lead/${id}`, leadData);

  return response.data;
}

// Delete a lead
export async function deleteLead(id) {
  await api.delete(`/api/leads/delete-lead/${id}`);
}

// Get lead status counts
export async function getStatusCounts() {
  const response = await api.get("/api/leads/status-counts");

  return response.data;
}
