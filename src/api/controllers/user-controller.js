import { addUser, findUserById, listAllUsers } from '../models/user-model.js';

const getUsers = (req, res) => {
    res.json(listAllUsers());
};

const getUserById = (req, res) => {
    const user = findUserById(req.params.id);
    if (!user) return res.sendStatus(404);

    res.json(user);
};

const postUser = (req, res) => {
    const result = addUser(req.body);
    res.status(201).json({ message: 'New user added.', result });
};

const putUser = (req, res) => {
    res.json({ message: 'User item updated.' });
};

const deleteUser = (req, res) => {
    res.json({ message: 'User item deleted.' });
};

export { getUsers, getUserById, postUser, putUser, deleteUser };