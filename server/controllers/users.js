// import * as queries from '../models/queries.js';
import db from '../models/db.js';
import { sendMessage } from '../kafka/producer.js';

// GET all users
export const getUsers = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

//GET users by id
export const getUserByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// POST new user
export const createUser = async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ error: 'Email, password and role are required' });
  }
  try {
    const newUser = await db.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
      [email, password, role]
    );

    console.log('Sending Kafka message...'); // Check before the Kafka call.
    await sendMessage('user-events', {
      type: 'USER_CREATED',
      data: { userId: newUser.rows[0].id },
    });
    console.log('Kafka message sent.'); // Check after the Kafka call.

    res.status(201).json({ messge: 'User created successfuly' });
  } catch (err) {
    next(err);
  }
};

// DELETE user by id
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM users WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
