// import express from 'express';
// import cors from 'cors';

// const app = express();
// const PORT = 8000;

// // Basic middleware
// app.use(cors());
// app.use(express.json());

// // Simple health check - 避免复杂路由
// app.get('/api/health', (req, res) => {
//   console.log('Health check accessed');
//   res.json({
//     message: 'Server is running!',
//     timestamp: new Date().toISOString()
//   });
// });

// // Simple test endpoint
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Test successful!' });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`🔗 Test: http://localhost:${PORT}/api/health`);
// });

// server/app.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pool from './models/db.js'; // Import the pool
import usersRoute from './routes/users.js';
import jobsRouter from './routes/jobs.js';
import { connectProducer } from './kafka/producer.js';
import { runConsumer } from './kafka/consumer.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Your routes will go here...

app.get('/', (req, res) => {
  res.send('Welcome to the NeatNest API!');
});
app.use('/api/jobs', jobsRouter);
app.use('/api/users', usersRoute);

app.listen(PORT, async () => {
  // Test database connection on startup
  try {
    await pool.query('SELECT NOW()'); // Simple query to test connection
    console.log('✅ Database connection successful.');
  } catch (err) {
    console.error('❌ Database connection failed.', err);
    process.exit(1);
  }
  await connectProducer();
  await runConsumer();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
