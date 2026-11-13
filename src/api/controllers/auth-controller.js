import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {findUserByUsername} from '../models/user-model.js';

const postLogin = async (req, res) => {
    const user = await findUserByUsername(req.body.username);
    if (!user) return res.sendStatus(401);

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    const userWithNoPassword = {
        user_id: user.user_id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });

    res.json({user: userWithNoPassword, token});
};

const getMe = (req, res) => {
    if (!res.locals.user) return res.sendStatus(401);

    res.json({message: 'token ok', user: res.locals.user});
};

export {postLogin, getMe};