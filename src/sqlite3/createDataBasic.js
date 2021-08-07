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
        let name = 'User ' + nextContentNos.join('.');
        db.run(`INSERT INTO user(name) VALUES(?)`, [name], async function(err) {
            if (err) {
                return console.log(err.message);
            }
            // Get the last insert id
            let userId = this.lastID;
            console.log(`User "${name}" is created. Id = ${userId}`);
            createUserPosts(userId, nextContentNos);
        });
    }
}

function createUserPosts(userId, previousContentNos) {
    for (let postNo = 1; postNo <= POST_NUM; postNo++) {
        let nextContentNos = previousContentNos.concat([postNo]);
        let content = 'Post ' + nextContentNos.join('.');
        db.run(`INSERT INTO post(user_id, content) VALUES(?, ?)`, [userId, content], function(err) {
            if (err) {
                return console.log(err.message);
            }
            // Get the last insert id
            let postId = this.lastID;
            console.log(`Post "${content}" is created. Id = ${postId}`);
            createUserPostComments(postId, nextContentNos);
        });
    }
}

function createUserPostComments(postId, previousContentNos) {
    for (let commentNo = 1; commentNo <= COMMENT_NUM; commentNo++) {
        let nextContentNos = previousContentNos.concat([commentNo]);
        let content = 'Comment ' + nextContentNos.join('.');
        db.run(`INSERT INTO comment(post_id, content) VALUES(?, ?)`, [postId, content], function(err) {
            if (err) {
                return console.log(err.message);
            }
            // Get the last insert id
            let commentId = this.lastID;
            console.log(`Comment "${content}" is created. Id = ${commentId}`);
        });
    }
}

connectDb();
createTables();
creatUsers([]);
closeDb();