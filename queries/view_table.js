const { db } = require('../db/db');

function viewTable (table, callback) {
    db.query(`SELECT * FROM ${table};`, (err, result) => {
        if (err) throw err;

        console.table(result);

        callback();
    });
}

module.exports = viewTable;