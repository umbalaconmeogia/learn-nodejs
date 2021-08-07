const db = require('_helpers/db');

module.exports = {
    getById,
};

async function getById(id) {
    return await getUser(id);
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}
