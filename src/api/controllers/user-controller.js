import { listAllUsers, findUserById, addUser, modifyUser, removeUser } from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
    res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
    const user = await findUserById(req.params.id);
    if (!user) return res.sendStatus(404);

    res.json(user);
};

const postUser = async (req, res) => {
    const userData = {
        ...req.body,
        role: 'user',
        password: await bcrypt.hash(req.body.password, 10),
    };
    const result = await addUser(userData);
    res.status(201).json({ message: 'New user added.', result });
};

const putUser = async (req, res) => {
    const currentUser = res.locals.user;
    const isAdmin = currentUser.role === 'admin';
    const isSelf = String(currentUser.user_id) === req.params.id;

    if (!isAdmin && !isSelf) return res.sendStatus(403);

    const updates = {...req.body};

    if (!isAdmin) {
        delete updates.role;
    }

    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
    }

    const result = await modifyUser(updates, req.params.id);
    if (!result) return res.sendStatus(404);

    res.json({message: 'User item updated.'})
};

const deleteUser = async (req, res) => {
    const currentUser = res.locals.user;
    const isAdmin = currentUser.role === 'admin';
    const isSelf = String(currentUser.user_id) === req.params.id;

    if (!isAdmin && !isSelf) return res.sendStatus(403);

    const result = await removeUser(req.params.id);
    if (!result) return res.sendStatus(404);

    res.json({message: 'User item deleted.'});
};

export { getUsers, getUserById, postUser, putUser, deleteUser };