require('dotenv').config({ path: '../../.env' });
const SqliteDb = require('./libs/SqliteDb');

const sqlite = SqliteDb.createDb(process.env.USER_POST_COMMENT_DBNAME);

/**
 * Create user records in *user* table.
 */
function creatUsers() {
    let previousContentNos = [];
    for (let userNo = 1; userNo <= process.env.USER_NUM; userNo++) {
        let nextContentNos = previousContentNos.concat([userNo]);
        queryCreateUser(nextContentNos)
            .then(userId => {
                createPosts(userId, nextContentNos);
            })
            .catch(err => {
                throw err
            });
    }
}

/**
 * Create post records in *post* table.
 * @param {int} userId
 * @param {string[]} previousContentNos List of user number, used for generating string content.
 */
function createPosts(userId, previousContentNos) {
    for (let postNo = 1; postNo <= process.env.POST_NUM; postNo++) {
        let nextContentNos = previousContentNos.concat([postNo]);
        queryCreatePost(userId, nextContentNos)
            .then(postId => {
                createComments(postId, nextContentNos);
            });
    }
}

/**
 * Create comment records in *comment* table.
 * @param {int} postId
 * @param {string[]} previousContentNos List of user/post number, used for generating string content.
 */
 function createComments(postId, previousContentNos) {
    for (let commentNo = 1; commentNo <= process.env.COMMENT_NUM; commentNo++) {
        let nextContentNos = previousContentNos.concat([commentNo]);
        queryCreateComment(postId, nextContentNos)
            .then(commentId => {
                // Do nothing. Just for keeping code pattern as another function.
            });
    }
}

/**
 * Create a user in DB.
 * @param {int[]} contentNos Array of numbers used to generate content.
 */
function queryCreateUser(contentNos) {
    return new Promise((resolve, reject) => {
        let name = 'User ' + contentNos.join('.');
        sqlite.db.run(`INSERT INTO user(name) VALUES(?)`, [name], async function(err) {
            if (err) reject(err);
            // Get the last insert id
            let userId = this.lastID;
            console.log(`User "${name}" is created. Id = ${userId}`);
            resolve(userId);
        });
    });
}

/**
 * Create a user in DB.
 * @param {int[]} contentNos Array of numbers used to generate content.
 */
 function queryCreatePost(userId, contentNos) {
    return new Promise((resolve, reject) => {
        let content = 'Post ' + contentNos.join('.');
        sqlite.db.run(`INSERT INTO post(user_id, content) VALUES(?, ?)`, [userId, content], function(err) {
            if (err) reject(err);
            // Get the last insert id
            let postId = this.lastID;
            console.log(`Post "${content}" is created. Id = ${postId}`);
            resolve(postId);
        });
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
        sqlite.db.run(`INSERT INTO comment(post_id, content) VALUES(?, ?)`, [postId, content], function(err) {
            if (err) reject(err);
            // Get the last insert id
            let commentId = this.lastID;
            console.log(`Comment "${content}" is created. Id = ${commentId}`);
            resolve(commentId);
        });
    });
}

creatUsers();
sqlite.closeDb();