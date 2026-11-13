import { Router } from 'express';
import { getCat, getCatsByUserId, postCat, putCat, deleteCat, getCatById } from "../controllers/cat-controller.js";
import multer from 'multer';
import { createThumbnail } from "../../middlewares/upload.js";

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getCat);
router.get('/user/:userId', getCatsByUserId);
router.get('/:id', getCatById);
router.put('/:id', putCat);
router.delete('/:id', deleteCat);
router.post('/', upload.single('cat'), createThumbnail, postCat);

export default router;