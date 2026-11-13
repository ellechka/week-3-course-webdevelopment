import express from "express";
import catRouter from './api/routes/cat-router.js';
import userRouter from "./api/routes/user-router.js";
import authRouter from './api/routes/auth-router.js';

const app = express();

app.use(express.json());
app.use('/api/v1/cats', catRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

export default app;