const db = require('../db/db');

function viewTable (table) {
    db.query(`SELECT * FROM ${table};`, (err, result) => {
        if (err) throw err;

        console.log(result);
    });
}

module.exports = viewTable;