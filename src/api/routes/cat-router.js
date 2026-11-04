import { Router } from 'express';
import { getCat, postCat, putCat, deleteCat, getCatById } from "../controllers/cat-controller.js";

const router = Router();

router.get('/', getCat);
router.get('/:id', getCatById);
router.post('/', postCat);
router.put('/:id', putCat);
router.delete('/:id', deleteCat);

export default router;