// server/test.js
// import express from 'express';

// const app = express();
// const PORT = 5000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.get('/api/health', (req, res) => {
//   res.json({ message: 'Working!' });
// });

// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`✅ Test server running on http://localhost:${PORT}`);
// });

import express from 'express';
import pool from './models/db.js';

const app = express();
const PORT = 5001;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'Working!' });
});

app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    console.log('rows', rows);
    res.json(rows);
  } catch (err) {
    console.log('Error getting users ', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server runing on http://:localhost:${PORT}`);
});
