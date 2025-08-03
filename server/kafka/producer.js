// server/kafka/producer.js
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'neatnest-producer',
  brokers: process.env.KAFKA_BROKERS.split(','),
});

const producer = kafka.producer();

export const connectProducer = async () => {
  try {
    await producer.connect();
    console.log('✅ Kafka Producer connected.');
  } catch (err) {
    console.error('❌ Failed to connect Kafka Producer:', err);
  }
};

export const sendMessage = async (topic, message) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  } catch (err) {
    console.error(`❌ Could not send message to topic ${topic}:`, err);
  }
};
