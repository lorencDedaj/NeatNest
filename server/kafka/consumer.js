import {Kafka} from 'kafkajs';
// db.js
import { Client } from 'pg';

const client = new Client({
  user: 'system',      // change to your posgres username
  host: 'localhost',          // this should be the same
  database: 'mydb',           // change to your database
  password: '111111',  // password
  port: 5432,                 // default
});

const kafka = new Kafka({
    clientId: 'jobConsumer',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({groupId: 'job-group'});

const startConsumer = async ()=>{
    await client.connect();  // 
    console.log('PostgreSQL connected');
    await consumer.connect();
    await consumer.subscribe({topic:'jobs', fromBeginning: true});
    await consumer.run({
        eachMessage: async ({topic, partition, message})=>{
            console.log({
                topic,
                partition,
                offset: message.offset,
                value: message.value.toString(),
            });
            // save the message to database. pg. 
            const job = JSON.parse(message.value.toString());
            const insertQuery = `INSERT INTO jobs (description, deadline, budget, created_by) VALUES ($1, $2, $3, $4)`;
            await client.query(insertQuery, [
                job.description,
                job.deadline,
                job.budget,
                job.createdBy,
            ]);
            console.log('Job saved to DB');
        },
    });
};
startConsumer().catch(console.error);