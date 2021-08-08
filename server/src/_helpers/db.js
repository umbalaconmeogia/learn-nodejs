const { Sequelize } = require('sequelize');
const fs = require('fs');

module.exports = db = {
    resetDatabase,
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


    // Init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.Post = require('../posts/post.model')(sequelize);
    db.Comment = require('../comments/comment.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}

async function resetDatabase() {
    console.log("Delete database " + process.env.USER_POST_COMMENT_DBNAME);
    fs.unlinkSync(databaseFileName());
    await initialize();
}

function databaseFileName() {
    const databaseName = process.env.USER_POST_COMMENT_DBNAME;
    const databaseFileName = `../../common/data/${databaseName}.sqlite`;
    return databaseFileName;
}