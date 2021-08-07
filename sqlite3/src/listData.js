require('dotenv').config({ path: '../../.env' });
const SqliteDb = require('./libs/SqliteDb');

const sqlite = SqliteDb.connectDb(process.env.USER_POST_COMMENT_DBNAME);

sqlite.listTable('user');
sqlite.listTable('post');
sqlite.listTable('comment');
sqlite.closeDb();