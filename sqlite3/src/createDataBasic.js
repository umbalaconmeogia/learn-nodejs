require('dotenv').config({ path: '../../.env' });
const SqliteDb = require('./libs/SqliteDb');

const sqlite = SqliteDb.createDb(process.env.USER_POST_COMMENT_DBNAME);

function creatUsers(previousContentNos) {
    for (let userNo = 1; userNo <= process.env.USER_NUM; userNo++) {
        let nextContentNos = previousContentNos.concat([userNo]);
        let name = 'User ' + nextContentNos.join('.');
        sqlite.db.run(`INSERT INTO user(name) VALUES(?)`, [name], async function(err) {
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
    for (let postNo = 1; postNo <= process.env.POST_NUM; postNo++) {
        let nextContentNos = previousContentNos.concat([postNo]);
        let content = 'Post ' + nextContentNos.join('.');
        sqlite.db.run(`INSERT INTO post(user_id, content) VALUES(?, ?)`, [userId, content], function(err) {
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
    for (let commentNo = 1; commentNo <= process.env.COMMENT_NUM; commentNo++) {
        let nextContentNos = previousContentNos.concat([commentNo]);
        let content = 'Comment ' + nextContentNos.join('.');
        sqlite.db.run(`INSERT INTO comment(post_id, content) VALUES(?, ?)`, [postId, content], function(err) {
            if (err) {
                return console.log(err.message);
            }
            // Get the last insert id
            let commentId = this.lastID;
            console.log(`Comment "${content}" is created. Id = ${commentId}`);
        });
    }
}

creatUsers([]);
sqlite.closeDb();