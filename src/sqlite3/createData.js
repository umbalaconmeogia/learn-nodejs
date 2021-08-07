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

function creatUsers() {
    for (let userNo = 1; userNo <= USER_NUM; userNo++) {
        queryCreateUser(userNo)
            .then(userId => {
                createUserPosts(userId, userNo);
            })
            .catch(err => {
                throw err
            });
    }
}

function createUserPosts(userId, userNo) {
    for (let postNo = 1; postNo <= POST_NUM; postNo++) {
        queryCreatePost(userId, userNo, postNo)
            .then(postId => {
                createUserPostComments(postId, userNo, postNo);
            });
    }
}

function createUserPostComments(postId, userNo, postNo) {
    for (let commentNo = 1; commentNo <= POST_NUM; commentNo++) {
        queryCreateComment(postId, userNo, postNo, commentNo);
    }
}

function queryCreateUser(userNo) {
    return new Promise((resolve, reject) => {
        var userName = `User ${userNo}`;
        db.run(`INSERT INTO user(name) VALUES(?)`, [userName], async function(err) {
            if (err) reject(err);
            // Get the last insert id
            let userId = this.lastID;
            console.log(`User ${userName} is created. Id = ${userId}`);
            resolve(userId);
        });
    });
}

function queryCreatePost(userId, userNo, postNo) {
    return new Promise((resolve, reject) => {
        var content = `Post ${userNo}.${postNo}`;
        db.run(`INSERT INTO post(user_id, content) VALUES(?, ?)`, [userId, content], function(err) {
            if (err) reject(err);
            // Get the last insert id
            let postId = this.lastID;
            console.log(`Post ${content} is created. Id = ${postId}`);
            resolve(postId);
        });
    });
}

function queryCreateComment(postId, userNo, postNo, commentNo) {
    return new Promise((resolve, reject) => {
        var content = `Comment ${userNo}.${postNo}.${commentNo}`;
        db.run(`INSERT INTO comment(post_id, content) VALUES(?, ?)`, [postId, content], function(err) {
            if (err) reject(err);
            // Get the last insert id
            let commentId = this.lastID;
            console.log(`Comment ${content} is created. Id = ${commentId}`);
            resolve(commentId);
        });
    });
}

connectDb();
createTables();
creatUsers();
closeDb();