// server/middleware/validateLead.js
import { LEAD_STATUSES, LEAD_SOURCES } from "../constants/lead.js";

export function validateLead(req, res, next) {
  const data = req.body || {}; 

  const requiredFields = [
    "name",
    "email",
    "phone",
    "company",
    "source",
    "status",
  ];

  // Check all required fields
  const isMissing = requiredFields.some(
    (field) => !data[field] || !String(data[field]).trim(),
  );

  if (isMissing) {
    return res.status(400).json({
      success: false,
      message: "Please provide complete information",
    });
  }

  // Normalize strings once
  const clean = {
    name: String(data.name).trim(),
    email: String(data.email).trim().toLowerCase(),
    phone: String(data.phone).trim(),
    company: String(data.company).trim(),
    source: String(data.source).trim(),
    status: String(data.status).trim(),
  };

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(clean.email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  // Validate status enum
  if (!LEAD_STATUSES.includes(clean.status)) {
    return res.status(400).json({
      success: false,
      message: `Status Invalid, Please Provide Correct`,
    });
  }

  // Validate source enum
  if (!LEAD_SOURCES.includes(clean.source)) {
    return res.status(400).json({
      success: false,
      message: `Source Invalid, Please Provide Correct`
    });
  }

  req.body = clean;
  next();
}
