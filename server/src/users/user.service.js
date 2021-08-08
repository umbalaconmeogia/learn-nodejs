const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
};

async function getAll(searchCondition) {
    let options = {};
    if (searchCondition) {
        options.where = searchCondition;
    }
    return await db.User.findAll(options);
}

async function getById(id) {
    return await getUser(id);
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}
