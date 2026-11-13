import { listAllUsers, findUserById, addUser, modifyUser, removeUser } from '../models/user-model.js';

const getUsers = async (req, res) => {
    res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
    const user = await findUserById(req.params.id);
    if (!user) return res.sendStatus(404);

    res.json(user);
};

const postUser = async (req, res) => {
    const result = await addUser(req.body);
    res.status(201).json({ message: 'New user added.', result });
};

const putUser = async (req, res) => {
    const result = await modifyUser(req.body, req.params.id);
    if (!result) return res.sendStatus(404);

    res.json({message: 'User item updated.'});
};

const deleteUser = async (req, res) => {
    const result = await removeUser(req.params.id);
    if (!result) return res.sendStatus(404);

    res.json({message: 'User item deleted.'});
};

export { getUsers, getUserById, postUser, putUser, deleteUser };