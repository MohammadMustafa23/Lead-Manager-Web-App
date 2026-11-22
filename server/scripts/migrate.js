import{pool} from "../config/db.js";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runMigrations = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        migration_name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT NOW()
      );
    `);

    const migrationName = "001_create_leads.sql";

    const { rows } = await pool.query(
      "SELECT 1 FROM schema_migrations WHERE migration_name = $1",
      [migrationName],
    );

    if (rows.length > 0) {
      console.log(`Already executed: ${migrationName}`);
      return;
    }

    const migrationPath = path.join(__dirname, "../migrations", migrationName);

    const sql = await fs.readFile(migrationPath, "utf-8");

    await pool.query("BEGIN");

    try {
      await pool.query(sql);

      await pool.query(
        "INSERT INTO schema_migrations (migration_name) VALUES ($1)",
        [migrationName],
      );

      await pool.query("COMMIT");

      console.log(`Migration completed: ${migrationName}`);
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  } catch (error) {
    console.error("Migration failed:", error.message);
    throw error;
  } finally {
    await pool.end();
  }
};

runMigrations().catch(() => process.exit(1));
