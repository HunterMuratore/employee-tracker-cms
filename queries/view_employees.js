const fs = require('fs');
const { db } = require('../db/db');

const sqlQuery = fs.readFileSync('./db/query.sql', 'utf-8').split(';')[0];

function viewEmployees (callback) {
    // Get the table the user is looking for in the database
    db.query(sqlQuery, (err, result) => {
        if (err) throw err;

        console.log(`\nEmployees Table`);
        console.table(result);
        console.log('\n');

        callback();
    });
}

module.exports = viewEmployees;