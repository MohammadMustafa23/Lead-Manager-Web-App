import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    const result = await pool.query("SELECT current_database() AS database");

    console.log(`PostgreSQL Connected: ${result.rows[0].database}`);
  } catch (error) {
    console.error("PostgreSQL Connection Failed:", error.message);
    throw error;
  }
};
