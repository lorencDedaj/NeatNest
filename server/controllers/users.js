import * as queries from '../models/queries.js';

export const getUsers = async (req, res) => {
  try {
    const allUsers = await queries.getAllUsers();
    res.json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
