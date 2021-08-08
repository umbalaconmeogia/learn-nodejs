require('rootpath')();
require('dotenv').config({ path: '../../.env' });
const db = require('_helpers/db');

async function main() {
    try {
        await db.listTable('user');
        await db.listTable('post');
        await db.listTable('comment');
    } catch (e) {
        console.error(e);
    } finally {
    }
}

main();
