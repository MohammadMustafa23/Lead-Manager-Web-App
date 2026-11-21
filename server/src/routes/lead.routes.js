import express from "express";
import {
  createLead,
  deleteLead,
  getLead,
  getStatusCounts,
  listLeads,
  updateLead,
} from "../controller/lead.controller.js";
import { validateLead } from "../middleware/validateLead.js";

const leadRouter = express.Router();

leadRouter.post("/create-lead", validateLead, createLead);

leadRouter.get("/get-leads", listLeads);

leadRouter.get("/get-lead/:id", getLead);

leadRouter.put("/update-lead/:id", validateLead, updateLead);

leadRouter.delete("/delete-lead/:id", deleteLead);

leadRouter.get("/status-counts", getStatusCounts);

export default leadRouter;
