import express from 'express';
import { cats } from '../models/cat-model.js';

const router = express.Router();

router.get('/', (req, res) => {
   res.json(cats);
});

export default router;