const { db } = require('../db/db');

function viewTable (table, callback) {
    db.query(`SELECT * FROM ${table};`, (err, result) => {
        if (err) throw err;

        console.log(`\n${table[0].toUpperCase() + table.slice(1)} Table`);
        console.table(result);
        console.log('\n');

        callback();
    });
}

module.exports = viewTable;