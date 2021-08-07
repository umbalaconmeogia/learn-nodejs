const db = require('_helpers/db');

module.exports = {
    getById,
};

async function getById(id) {
    return await getComment(id);
}

// helper functions

async function getComment(id) {
    const comment = await db.Comment.findByPk(id);
    if (!comment) throw 'Comment not found';
    return comment;
}
