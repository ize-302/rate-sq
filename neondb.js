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