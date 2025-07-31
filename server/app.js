import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple health check - 避免复杂路由
app.get('/api/health', (req, res) => {
  console.log('Health check accessed');
  res.json({ 
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test successful!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/health`);
});
