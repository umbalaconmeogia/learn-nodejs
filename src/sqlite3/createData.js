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
        var userName = `User ${userNo}`;
        db.serialize(() => {
            db.run(`INSERT INTO user(name) VALUES(?)`, [userName], async function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // Get the last insert id
                let userId = this.lastID;
                console.log(`User ${userName} is created. Id = ${userId}`);
                await createUserPosts(userNo, userId);
            });
        });
    }
}

function createUser(userNo) {
    return new Promise((resolve, reject) => {

    });
}

async function createUserPosts(userNo, userId) {
    for (let postNo = 1; postNo <= POST_NUM; postNo++) {
        var content = `Post ${userNo}.${postNo}`;
        db.serialize(() => {
            db.run(`INSERT INTO post(user_id, content) VALUES(?, ?)`, [userId, content], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // Get the last insert id
                let postId = this.lastID;
                console.log(`Post ${content} is created. Id = ${postId}`);
                createUserPostComments(userNo, postNo, postId);
            });
        });
    }
}

function createUserPostComments(userNo, postNo, postId) {
    for (let commentNo = 1; commentNo <= POST_NUM; commentNo++) {
        var content = `Comment ${userNo}.${postNo}.${commentNo}`;
        db.serialize(() => {
            db.run(`INSERT INTO comment(post_id, content) VALUES(?, ?)`, [postId, content], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // Get the last insert id
                let commentId = this.lastID;
                console.log(`Post ${content} is created. Id = ${commentId}`);
            });
        });
    }
}

connectDb();
createTables();
creatUsers();
closeDb();