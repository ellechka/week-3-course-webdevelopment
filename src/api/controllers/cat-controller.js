import {addCat, findCatById, listAllCats, listCatsByUserId, modifyCat, removeCat } from '../models/cat-model.js';

const getCat = async (req, res) => {
    res.json(await listAllCats());
};

const getCatsByUserId = async (req, res) => {
  res.json(await listCatsByUserId(req.params.userId));
};

const getCatById = async (req, res) => {
    const cat = await findCatById(req.params.id);
    if (!cat) return res.sendStatus(404);

    res.json(cat);
};

const postCat = async (req, res) => {
    const result = await addCat({
        ...req.body,
        filename: req.file?.filename,
    });

    if (!result) return res.sendStatus(400);

    res.status(201).json({message: 'New cat added.', result});
};

const putCat = async (req, res) => {
    const result = await modifyCat(req.body, req.params.id, res.locals.user);
    if (!result) return res.sendStatus(404);

    res.json({message: 'Cat item updated.'});
};

const deleteCat = async (req, res) => {
    const result = await removeCat(req.params.id, res.locals.user);
    if (!result) return res.sendStatus(404);

    res.json({message: 'Cat item deleted.'});
};

export { getCat, getCatsByUserId ,getCatById, postCat, putCat, deleteCat };