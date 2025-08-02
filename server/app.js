import express from 'express';
import cors from 'cors';
// 1. step 1 import Kafka from kafkajs
import {Kafka} from 'kafkajs';

const app = express();
const PORT = 8000;

// Basic middleware
app.use(cors());
app.use(express.json());

// step 2. to create a kafka client instance, that only to create kafka component:
// for example producer, consumer, admin etc.
const kafka = new Kafka({
  clientId: 'my-job-api',
  brokers: ['localhost:9092'], // replace to your  Kafka broker address
});

const producer = kafka.producer();
// this is only for producer to connect to kafka
const startKafka = async ()=>{
  await producer.connect();
  console.log('Kafka Producer connected!');
}
startKafka().catch(console.error);

// Simple health check - 避免复杂路由
app.post('/api/jobs',async (req, res) => {
  console.log('job posted:', req.body);
  try {
    await producer.send({
      topic: 'jobs',
      messages: [
        {
          value: JSON.stringify(req.body),
        },
      ]
    });
    res.json({
      status: 'ok',
      message: 'message send to kafka',
      payload: req.body,
    })
  }catch (error){
    console.error('kafka message failed: ', error);
    res.status(500).json({status:'error', message:'Kafka forward failed!'})
  }
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test successful!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/jobs`);
});
