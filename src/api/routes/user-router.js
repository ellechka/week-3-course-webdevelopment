import { Router } from 'express';
import {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js'

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', postUser);
router.put('/:id', authenticateToken, putUser);
router.delete('/:id', authenticateToken, deleteUser);

export default router;