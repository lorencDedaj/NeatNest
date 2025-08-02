import express from 'express';
import {
  getUsers,
  getUserByID,
  createUser,
  deleteUser,
} from '../controllers/users.js';

const router = express.Router();
//GET all users
router.get('/', getUsers);

//GET users by id
router.get('/:id', getUserByID);

// POST user --- create new user
router.post('/', createUser);

//DELETE user by id
router.delete('/:id', deleteUser);

export default router;
