import { Router } from 'express';
import { getCat, getCatsByUserId, postCat, putCat, deleteCat, getCatById } from "../controllers/cat-controller.js";
import multer from 'multer';
import { createThumbnail } from "../../middlewares/upload.js";
import {authenticateToken} from '../../middlewares/authentication.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getCat);
router.get('/user/:userId', getCatsByUserId);
router.get('/:id', getCatById);
router.put('/:id', authenticateToken, putCat);
router.delete('/:id', authenticateToken, deleteCat);
router.post('/', upload.single('cat'), createThumbnail, postCat);

export default router;