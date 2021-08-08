require('rootpath')();
require('dotenv').config({ path: '../../.env' });
const db = require('_helpers/db');

/**
 * Create user records in *user* table.
 */
 function creatUsers() {
    let previousContentNos = [];
    for (let userNo = 1; userNo <= process.env.USER_NUM; userNo++) {
        let nextContentNos = previousContentNos.concat([userNo]);
        queryCreateUser(nextContentNos)
            .then(user => {
                console.log(user);
            })
            .catch(err => {
                throw err
            });
    }
}

/**
 * Create a user in DB.
 * @param {int[]} contentNos Array of numbers used to generate content.
 */
 function queryCreateUser(contentNos) {
    return new Promise((resolve, reject) => {
        let name = 'User ' + contentNos.join('.');
        const user = db.User.create({
            name: name
        });
        if (user) resolve(user)
        else reject(user);
    });
}

async function main() {
    await db.resetDatabase();
    creatUsers();
}

main();
