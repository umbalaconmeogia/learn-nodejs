const SqliteDb = require('./libs/SqliteDb');

const databaseName = 'userPostComment';
const sqlite = new SqliteDb(databaseName);

sqlite.listTable('user');
sqlite.listTable('post');
sqlite.listTable('comment');
sqlite.close();