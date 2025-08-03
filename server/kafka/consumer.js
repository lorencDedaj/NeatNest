// server/kafka/consumer.js
import { Kafka } from 'kafkajs';
// import * as queries from '../models/queries.js'; // You'll use this later

const kafka = new Kafka({
  clientId: 'neatnest-consumer',
  brokers: process.env.KAFKA_BROKERS.split(','),
});

const consumer = kafka.consumer({ groupId: 'neatnest-stats-group' });

export const runConsumer = async () => {
  try {
    await consumer.connect();
    console.log('✅ Kafka Consumer connected.');

    // Subscribe to topics
    await consumer.subscribe({ topic: 'job-events', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const event = JSON.parse(message.value.toString());
        console.log(`[Kafka] Received Event: ${event.type}`, event.data);

        // This is where you'll add your logic later
        switch (event.type) {
          case 'JOB_CREATED':
            // Example: await queries.incrementJobsPosted(event.data.recruiterId);
            break;
          // Add other event types here...
        }
      },
    });
  } catch (err) {
    console.error('❌ Kafka Consumer error:', err);
  }
};
