require('rootpath')();
require('dotenv').config({ path: '../../.env' });
const db = require('_helpers/db');

/**
 * Create user records in *user* table.
 */
async function creatUsers() {
    let previousContentNos = [];
    for (let userNo = 1; userNo <= process.env.USER_NUM; userNo++) {
        let nextContentNos = previousContentNos.concat([userNo]);
        let user = await queryCreateUser(nextContentNos);
        await createPosts(user.id, nextContentNos);
    }
}

/**
 * Create post records in *post* table.
 * @param {int} userId
 * @param {string[]} previousContentNos List of user number, used for generating string content.
 */
 async function createPosts(userId, previousContentNos) {
    for (let postNo = 1; postNo <= process.env.POST_NUM; postNo++) {
        let nextContentNos = previousContentNos.concat([postNo]);
        let post = await queryCreatePost(userId, nextContentNos);
        await createComments(post.id, nextContentNos);
    }
}


/**
 * Create comment records in *comment* table.
 * @param {int} postId
 * @param {string[]} previousContentNos List of user/post number, used for generating string content.
 */
 async function createComments(postId, previousContentNos) {
    for (let commentNo = 1; commentNo <= process.env.COMMENT_NUM; commentNo++) {
        let nextContentNos = previousContentNos.concat([commentNo]);
        let comment = await queryCreateComment(postId, nextContentNos);
    }
}

/**
 * Create a user in DB.
 * @param {int[]} contentNos Array of numbers used to generate content.
 */
 function queryCreateUser(contentNos) {
    return new Promise((resolve, reject) => {
        let name = 'User ' + contentNos.join('.');
        const user = db.User.create({
            name: name,
        }).then(item => resolve(item));
    });
}

/**
 * Create a user in DB.
 * @param {int} userId
 * @param {int[]} contentNos Array of numbers used to generate content.
 */
 function queryCreatePost(userId, contentNos) {
    return new Promise((resolve, reject) => {
        let content = 'Post ' + contentNos.join('.');
        const post = db.Post.create({
            user_id: userId,
            content: content,
        }).then(item => resolve(item));
    });
}

/**
 * Create a user in DB.
 * @param {int} postId
 * @param {int[]} contentNos Array of numbers used to generate content.
 */
 function queryCreateComment(postId, contentNos) {
    return new Promise((resolve, reject) => {
        let content = 'Comment ' + contentNos.join('.');
        const comment = db.Comment.create({
            post_id: postId,
            content: content,
        }).then(item => resolve(item));
    });
}

async function main() {
    try {
        await db.resetDatabase();
        await creatUsers();
    } catch (e) {
        console.error(e);
    } finally {
    }
}

main();
