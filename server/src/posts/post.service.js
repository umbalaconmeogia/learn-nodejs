const db = require('_helpers/db');

module.exports = {
    getById,
};

async function getById(id) {
    return await getPost(id);
}

// helper functions

async function getPost(id) {
    const post = await db.Post.findByPk(id);
    if (!post) throw 'Post not found';
    return post;
}
