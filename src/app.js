import express from "express";
import catRouter from './api/routes/cat-router.js';

const app = express();

app.use(express.json());
app.use('/api/v1/cats', catRouter);

export default app;