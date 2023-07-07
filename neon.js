// import { Pool } from '@neondatabase/serverless'

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   connectionTimeoutMillis: 10000, // connection timeout in milliseconds
//   idleTimeoutMillis: 10000 // idle timeout in milliseconds
// });

// export default pool

import postgres from 'postgres';

const sql = postgres({
  User: process.env.PGUSER,
  Password:
    process.env.PGPASSWORD,
  'Database name': process.env.PGDATABASE,
  Hostname: process.env.PGHOST,
  ssl: 'require'
});

export default sql