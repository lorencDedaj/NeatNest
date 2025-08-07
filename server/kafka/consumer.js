// server/kafka/consumer.js
import { Kafka } from 'kafkajs';
import { Client } from 'pg';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const URL = 'http://localhost:3000/find-jobs';

const db = new Client({
  user: process.env.DB_USER || 'system',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'mydb',
  password: process.env.DB_PASSWORD || '111111',
  port: process.env.DB_PORT || 5432,
});

const kafka = new Kafka({
  clientId: 'neatnest-consumer',
  brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'job-group' });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailNotification = async (job) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_TO,
    subject: 'A New Job Posted!',
    text: `A new job has been posted:\n\nDescription: ${job.description}\nBudget: $${job.budget}\nDeadline: ${job.deadline}\nPosted by: ${job.createdBy}\n URL: ${URL}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email notification sent');
  } catch (err) {
    console.log('❌ Failed to send email notification:', err);
  }
};

const runConsumer = async () => {
  try {
    await db.connect();
    console.log('✅ PostgreSQL connected (consumer)');

    await consumer.connect();
    await consumer.subscribe({ topic: 'jobs', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const job = JSON.parse(message.value.toString());
        console.log('📥 Received job:', job);

        const insertQuery = `
          INSERT INTO jobs (description, deadline, budget, created_by)
          VALUES ($1, $2, $3, $4)
        `;
        await db.query(insertQuery, [
          job.description,
          job.deadline,
          job.budget,
          job.createdBy,
        ]);

        console.log('✅ Job saved to database');

        await sendEmailNotification(job);
      },
    });
  } catch (err) {
    console.error('❌ Consumer error:', err);
  }
};

export default runConsumer;
