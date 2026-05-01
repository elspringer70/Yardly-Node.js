const express = require('express');
const { Pool } = require('pg');

const app = express();

// Use Vercel's automatic environment variable POSTGRES_URL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

app.use(express.json());

// API endpoint to fetch listings from Postgres
app.get('/api/listings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM listings ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// Export the app for Vercel
module.exports = app;