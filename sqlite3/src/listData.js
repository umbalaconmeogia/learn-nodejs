require('dotenv').config({ path: '../../.env' });
const SqliteDb = require('./libs/SqliteDb');

const sqlite = SqliteDb.connectDb(process.env.USER_POST_COMMENT_DBNAME);

function mainPromise() {
    sqlite.listTable('user')
        .then(() => {
            return sqlite.listTable('post');
        })
        .then(() => {
            return sqlite.listTable('comment');
        })
        .finally(() => {
            sqlite.closeDb();
        });
}

async function mainAsync() {
    await sqlite.listTable('user');
    await sqlite.listTable('post');
    await sqlite.listTable('comment');
    sqlite.closeDb();
}

// mainPromise();
mainAsync();
