const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

class SqliteDb {

    constructor(databaseName, create) {
        const databaseFileName = `./${databaseName}.sqlite`;

        if (create) {
            // Delete db file
            console.log(`Delete file ${databaseFileName}`);
            fs.unlinkSync(databaseFileName);
        }

        // Open the database
        this.db = new sqlite3.Database(databaseFileName, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log(`Connected to the ${databaseName} database.`);
        });

        if (create) {
            this.createTables();
        }
    }

    createTables() {
        console.log("Create tables.");
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE user(
                id INTEGER PRIMARY KEY,
                name TEXT
            )`);
            this.db.run(`CREATE TABLE post(
                id INTEGER PRIMARY KEY,
                user_id INTEGER,
                content TEXT
            )`);
            this.db.run(`CREATE TABLE comment(
                id INTEGER PRIMARY KEY,
                post_id INTEGER,
                content TEXT
            )`);
        });
    }

    close() {
        // Close the database connection
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }

    listTable(tableName) {
        this.db.all(`SELECT * FROM ${tableName}`, function(err, rows) {
            if (err) {
                console.error(err.message);
            }
            console.log(`Table "${tableName}"`);
            console.table(rows);
        });
    }
}

module.exports = SqliteDb;