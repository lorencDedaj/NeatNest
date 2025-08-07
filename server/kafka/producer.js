// server/kafka/producer.js
import { Kafka } from 'kafkajs';

// Create a kafka client instance
const kafka = new Kafka({
  clientId: 'neatnest-producer',
  brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
});

// Returns a producer from the kafka instance
// The producer is responsible for sending messages to Kafka topics
const producer = kafka.producer();

// Connects the producer
// await producer.connect() opens a TCP connection to kafka so that it can start sending messages to kafka
const connectProducer = async () => {
  try {
    await producer.connect();
    // console.log('✅ Kafka Producer connected.');
    console.log('✅ Kafka Producer connected.');
  } catch (err) {
    console.error('❌ Failed to connect Kafka Producer:', err);
  }
};

// Sends a batch of messages to the topic
// topic: 'jobs' This is the kafka topic
// kafka expects messages but they need to be stringified since kfka is binary-based
const sendMessage = async (topic, message) => {
  try {
    await producer.send({
      topic: 'jobs',
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`📤 Message sent to Kafka topic "${topic}"`);
  } catch (err) {
    console.error(`❌ Could not send message to topic "${topic}":`, err);
  }
};

export { connectProducer, sendMessage };
