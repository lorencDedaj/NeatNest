import express from 'express';
import { getUsers, getUserByID, createUser } from '../controllers/users.js';

const router = express.Router();
//GET all users
router.get('/', getUsers);

//GET users by id
router.get('/:id', getUserByID);

// POST user --- create new user
router.post('/', createUser);

export default router;
