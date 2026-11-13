import {Router} from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const authRouter = Router();

authRouter.post('/login', postLogin);
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;