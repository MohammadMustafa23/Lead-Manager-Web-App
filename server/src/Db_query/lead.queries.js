import { pool } from "../../config/db.js";

const SELECT_COLS = `
  id, name, email, phone, company, source, status,
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;


export async function insertLead({
  name,
  email,
  phone,
  company,
  source,
  status,
}) {
  const { rows } = await pool.query(
    `INSERT INTO leads (name, email, phone, company, source, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING ${SELECT_COLS}`,
    [name, email, phone, company, source, status],
  );
  return rows[0];
}


export async function findAllLeads({ search = "", status = "" } = {}) {
  const conditions = [];
  const values = [];

  if (search.trim()) {
    values.push(`%${search.trim()}%`);
    conditions.push(
      `(name ILIKE $${values.length} OR email ILIKE $${values.length})`,
    );
  }
  if (status.trim()) {
    values.push(status.trim());
    conditions.push(`status = $${values.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const { rows } = await pool.query(
    `SELECT ${SELECT_COLS} FROM leads ${where} ORDER BY created_at DESC`,
    values,
  );
  return rows;
}

// ---------- READ ONE ----------
export async function findLeadById(id) {
  const { rows } = await pool.query(
    `SELECT ${SELECT_COLS} FROM leads WHERE id = $1`,
    [id],
  );
  return rows[0] || null;
}


export async function updateLeadById(
  id,
  { name, email, phone, company, source, status },
) {
  const { rows } = await pool.query(
    `UPDATE leads
        SET name = $1, email = $2, phone = $3, company = $4,
            source = $5, status = $6, updated_at = NOW()
      WHERE id = $7
      RETURNING ${SELECT_COLS}`,
    [name, email, phone, company, source, status, id],
  );
  return rows[0] || null;
}


export async function deleteLeadById(id) {
  const { rowCount } = await pool.query(`DELETE FROM leads WHERE id = $1`, [
    id,
  ]);
  return rowCount > 0; // true = deleted, false = not found
}


export async function countLeadsByStatus() {
  const { rows } = await pool.query(
    `SELECT status, COUNT(*)::int AS count FROM leads GROUP BY status`,
  );

  const base = { New: 0, Contacted: 0, Qualified: 0, Lost: 0 };
  for (const row of rows) base[row.status] = row.count;
  return base;
}


// ---------- DASHBOARD STATS + RECENT LEADS ----------
export async function getDashboardData() {
  // 1. Get counts by status
  const countsQuery = pool.query(
    `SELECT status, COUNT(*)::int AS count FROM leads GROUP BY status`
  );

  // 2. Get the 5 most recent leads
  const recentQuery = pool.query(
    `SELECT 
       id, name, company, status, 
       created_at AS "createdAt" 
     FROM leads 
     ORDER BY created_at DESC 
     LIMIT 5`
  );

  // Run both queries in parallel for speed
  const [countsResult, recentResult] = await Promise.all([countsQuery, recentQuery]);

  // Format the counts to always include all 4 statuses
  const stats = { New: 0, Contacted: 0, Qualified: 0, Lost: 0 };
  let total = 0;
  
  for (const row of countsResult.rows) {
    stats[row.status] = row.count;
    total += row.count;
  }

  return {
    stats: {
      total,
      ...stats
    },
    recentLeads: recentResult.rows
  };
}