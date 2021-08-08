const { Sequelize, QueryTypes } = require('sequelize');
const fs = require('fs');

module.exports = db = {
    resetDatabase,
    listTable,
};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    // const { host, port, user, password, database } = config.database;
    // const connection = await mysql.createConnection({ host, port, user, password });
    // await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // Connect to db
    const databaseName = process.env.USER_POST_COMMENT_DBNAME;
    console.log("db name " + databaseName);
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: databaseFileName()
    });
    db.sequelize = sequelize;

    // Init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.Post = require('../posts/post.model')(sequelize);
    db.Comment = require('../comments/comment.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}

async function resetDatabase() {
    let fileName = databaseFileName();
    if (fs.existsSync(fileName)) {
        console.log("Delete database " + process.env.USER_POST_COMMENT_DBNAME);
        fs.unlinkSync(fileName);    
    }
    await initialize();
}

function databaseFileName() {
    const databaseName = process.env.USER_POST_COMMENT_DBNAME;
    const databaseFileName = `../../common/data/${databaseName}.sqlite`;
    return databaseFileName;
}

async function listTable(tableName) {
    let items = await db.sequelize.query(`SELECT * FROM ${tableName}`, { type: QueryTypes.SELECT })
    console.log(`Table "${tableName}"`);
    console.table(items);
}