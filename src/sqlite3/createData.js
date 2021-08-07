const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const databaseName = 'userPostComment';
const databaseFileName = `./${databaseName}.sqlite`;

const USER_NUM = 3;
const POST_NUM = 3;
const COMMENT_NUM = 3;

var db;

function connectDb() {
    // Delete db file
    console.log(`Delete file ${databaseFileName}`);
    fs.unlinkSync(databaseFileName);

    // Open the database
    db = new sqlite3.Database(databaseFileName, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log(`Connected to the ${databaseName} database.`);
    });
}

function closeDb() {
    // Close the database connection
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

function createTables() {
    console.log("Create tables.");
    db.serialize(() => {
        db.run(`CREATE TABLE user(
            id INTEGER PRIMARY KEY,
            name TEXT
        )`);
        db.run(`CREATE TABLE post(
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            content TEXT
        )`);
        db.run(`CREATE TABLE comment(
            id INTEGER PRIMARY KEY,
            post_id INTEGER,
            content TEXT
        )`);
    });
}

function creatUsers(previousContentNos) {
    for (let userNo = 1; userNo <= USER_NUM; userNo++) {
        let nextContentNos = previousContentNos.concat([userNo]);
        queryCreateUser(nextContentNos)
            .then(userId => {
                createUserPosts(userId, nextContentNos);
            })
            .catch(err => {
                throw err
            });
    }
}

function createUserPosts(userId, previousContentNos) {
    for (let postNo = 1; postNo <= POST_NUM; postNo++) {
        let nextContentNos = previousContentNos.concat([postNo]);
        queryCreatePost(userId, nextContentNos)
            .then(postId => {
                createUserPostComments(postId, nextContentNos);
            });
    }
}

function createUserPostComments(postId, previousContentNos) {
    for (let commentNo = 1; commentNo <= COMMENT_NUM; commentNo++) {
        let nextContentNos = previousContentNos.concat([commentNo]);
        queryCreateComment(postId, nextContentNos)
            .then(commentId => {
                // Do nothing. Just for keeping code pattern as another function.
            });
    }
}

/**
 * Create a user in DB.
 * @param {Array<Integer>} contentNos Array of numbers used to generate content.
 * @returns
 */
function queryCreateUser(contentNos) {
    return new Promise((resolve, reject) => {
        let name = 'User ' + contentNos.join('.');
        db.run(`INSERT INTO user(name) VALUES(?)`, [name], async function(err) {
            if (err) reject(err);
            // Get the last insert id
            let userId = this.lastID;
            console.log(`User "${name}" is created. Id = ${userId}`);
            resolve(userId);
        });
    });
}

function queryCreatePost(userId, contentNos) {
    return new Promise((resolve, reject) => {
        let content = 'Post ' + contentNos.join('.');
        db.run(`INSERT INTO post(user_id, content) VALUES(?, ?)`, [userId, content], function(err) {
            if (err) reject(err);
            // Get the last insert id
            let postId = this.lastID;
            console.log(`Post "${content}" is created. Id = ${postId}`);
            resolve(postId);
        });
    });
}

function queryCreateComment(postId, contentNos) {
    return new Promise((resolve, reject) => {
        let content = 'Comment ' + contentNos.join('.');
        db.run(`INSERT INTO comment(post_id, content) VALUES(?, ?)`, [postId, content], function(err) {
            if (err) reject(err);
            // Get the last insert id
            let commentId = this.lastID;
            console.log(`Comment "${content}" is created. Id = ${commentId}`);
            resolve(commentId);
        });
    });
}

connectDb();
createTables();
creatUsers([]);
closeDb();