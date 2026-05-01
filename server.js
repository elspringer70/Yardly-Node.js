const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection configuration
// Use connectionString for easier setup with hosted databases
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://your_user:your_password@localhost:5432/your_database',
});

// Middleware to serve static files (like your HTML, CSS, and JS)
app.use(express.static(__dirname));
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

// Catch-all route to serve your main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});