import { createContext, useContext, useEffect, useState } from "react";

import {
  getLeads,
  createLead as createLeadApi,
  updateLead as updateLeadApi,
  deleteLead as deleteLeadApi,
} from "../services/lead.service";

const LeadContext = createContext(null);

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLeads() {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load leads");
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, []);

  async function addLead(leadData) {
    const newLead = await createLeadApi(leadData);

    setLeads((current) => [newLead, ...current]);

    return newLead;
  }

  async function updateLead(id, leadData) {
    const updatedLead = await updateLeadApi(id, leadData);

    setLeads((current) =>
      current.map((lead) => (lead.id === id ? updatedLead : lead)),
    );

    return updatedLead;
  }

  async function deleteLead(id) {
    await deleteLeadApi(id);

    setLeads((current) => current.filter((lead) => lead.id !== id));
  }

  return (
    <LeadContext.Provider
      value={{
        leads,
        loading,
        error,
        addLead,
        updateLead,
        deleteLead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error("useLeads must be used inside LeadProvider");
  }

  return context;
}
