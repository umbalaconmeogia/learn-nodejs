const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

/**
 * Utility to access to sqlite3 database.
 *
 * The normal usage of this class
 * ```js
 * const databaseName = 'myDatabase';
 * var sqlite = SqliteDb.connectDb(databaseName); // Connect to the database.
 * sqlite.db.run(sql, [params], callback); // Access to the sqlite database.
 * sqlite.closeDb();
 * ```
 *
 * To create new database (including delete old one)
 * ```js
 * const databaseName = 'myDatabase';
 * var sqlite = SqliteDb.createDb(databaseName); // Create and connect to the database.
 * ```
 */
class SqliteDb {

    /**
     * Connect to the database.
     *
     * This may create new database (including create tables) if specified.
     * @constructor
     * @param {string} databaseName The name of database, which is stored in file data/<databaseName>.sqlite.
     * @param {boolean} create Create the database or not.
     */
    constructor(databaseName, create) {
        const databaseFileName = `../../common/data/${databaseName}.sqlite`;

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

    /**
     * Create all tables schema on new database.
     */
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

    /**
     * Connect to the database.
     * @param {string} databaseName The name of database, which is stored in file data/<databaseName>.sqlite.
     */
    static createDb(databaseName) {
        return new SqliteDb(databaseName, true);
    }

    /**
     * Connect to the database.
     * @param {string} databaseName The name of database, which is stored in file data/<databaseName>.sqlite.
     */
     static connectDb(databaseName) {
        return new SqliteDb(databaseName, false);
    }

    /**
     * Close connection to the database.
     */
    closeDb() {
        // Close the database connection
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }

    /**
     * List a database table to console.
     * @param {string} tableName
     */
    listTable(tableName) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM ${tableName}`, function(err, rows) {
                if (err) {
                    console.error(err.message);
                }
                console.log(`Table "${tableName}"`);
                console.table(rows);
                resolve();
            });
        });
    }
}

module.exports = SqliteDb;