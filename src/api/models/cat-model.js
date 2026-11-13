import promisePool from '../utils/database.js';

const catSelect = `SELECT c.*, u.name AS owner_name FROM wsk_cats c JOIN wsk_users u ON c.owner = u.user_id`;

const listAllCats = async () => {
    const [rows] = await promisePool.query(catSelect);
    return rows;
};

const listCatsByUserId = async (userId) => {
    const [rows] = await promisePool.execute(`${catSelect} WHERE c.owner = ?`, [userId],);
    return rows;
};

const findCatById = async (id) => {
    const [rows] = await promisePool.execute(`${catSelect} WHERE c.cat_id = ?`, [id],);
    return rows[0] ?? false;
};

const addCat = async (cat) => {
    const {cat_name, weight, owner, filename, birthdate} = cat;
    const [result] = await promisePool.execute(
        `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) 
        VALUES (?, ?, ?, ?, ?)`,
        [cat_name, weight, owner, filename, birthdate],
    );

    return result.affectedRows === 0 ? false : {cat_id: result.insertId};
};

const modifyCat = async (cat, id) => {
    const {cat_name, weight, owner, filename, birthdate} = cat;
    const [result] = await promisePool.execute(
        `UPDATE wsk_cats
         SET cat_name = ?, weight = ?, owner = ?, filename = ?, birthdate = ?
         WHERE cat_id = ?`,
        [cat_name, weight, owner, filename, birthdate, id],
    );

    if (result.affectedRows === 0) {
        const existingCat = await findCatById(id);
        if (!existingCat) return false;
    }

    return {message: 'success'};
};

const removeCat = async (id) => {
    const [result] = await promisePool.execute(
        'DELETE FROM wsk_cats WHERE cat_id = ?',
        [id],
    );

    return result.affectedRows === 0 ? false : {message: 'success'};
};

export {listAllCats, listCatsByUserId, findCatById, addCat, modifyCat, removeCat};