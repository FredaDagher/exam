require('dotenv').config();

const { once } = require('events');
const app = require('./app');
const pool = require('./db/pool');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await pool.query('SELECT 1');
    console.log(`Connected to MySQL database "${process.env.DB_NAME}"`);

    const server = app.listen(PORT);
    await once(server, 'listening');
    console.log(`Dunkin API (Lab 11 simple, MySQL) running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Failed to start server:', err.message);
    console.error('Check the DB_* values in .env (is DB_PASSWORD set? did you run npm run db:create?)');
    await pool.end();
    process.exit(1);
  }
}

startServer();
