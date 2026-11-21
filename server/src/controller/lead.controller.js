import {
  insertLead,
  findAllLeads,
  findLeadById,
  updateLeadById,
  deleteLeadById,
  countLeadsByStatus,
  getDashboardData
} from "../Db_query/lead.queries.js";

const LEAD_STATUSES = ["new", "contacted", "qualified", "converted", "lost"];

// Helpers
function getQueryString(value) {
  const result = Array.isArray(value) ? value[0] : value;
  return typeof result === "string" ? result : "";
}

function parseId(value) {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}



// Create Lead
export async function createLead(req, res) {
  try {
    const lead = await insertLead(req.body);

    return res
      .status(201)
      .location(`/api/leads/get-lead/${lead.id}`)
      .json(lead);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Get All Leads
export async function listLeads(req, res) {
  try {
    const search = getQueryString(req.query.search).trim().slice(0, 100);
    const status = getQueryString(req.query.status).trim();

    if (status && !LEAD_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${LEAD_STATUSES.join(", ")}`,
      });
    }

    const leads = await findAllLeads({ search, status });

    return res.status(200).json(leads);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Get Single Lead
export async function getLead(req, res) {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Invalid lead ID" });
  }

  try {
    const lead = await findLeadById(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json(lead);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Update Lead
export async function updateLead(req, res) {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Invalid lead ID" });
  }

  try {
    const updatedLead = await updateLeadById(id, req.body);

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json(updatedLead);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Delete Lead
export async function deleteLead(req, res) {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Invalid lead ID" });
  }

  try {
    const deleted = await deleteLeadById(id);

    if (!deleted) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Get Leads Count
export async function getStatusCounts(req, res) {
  try {
    const counts = await countLeadsByStatus();

    return res.status(200).json(counts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Dashboard
export async function getDashboard(req, res, next) {
  try {
    const data = await getDashboardData();
    res.json(data);
  } catch (err) {
    next(err);
  }
}