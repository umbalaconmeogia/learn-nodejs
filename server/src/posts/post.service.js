const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
};

async function getById(id) {
    return await getPost(id);
}

async function getAll(searchCondition) {
    let options = {};
    if (searchCondition) {
        options.where = searchCondition;
    }
    return await db.Post.findAll(options);
}

// helper functions

async function getPost(id) {
    const post = await db.Post.findByPk(id);
    if (!post) throw 'Post not found';
    return post;
}
