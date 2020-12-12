const { Pool } = require("pg");

const pool = new Pool({
  min: 1,
  max: 1,
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});

pool.on("connect", () => console.log("Postgres connected"));

module.exports = pool;
