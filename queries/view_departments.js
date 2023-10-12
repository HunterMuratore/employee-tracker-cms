const { db } = require('../db/db');

function viewDepartments (callback) {
    // Get the table the user is looking for in the database
    db.query('SELECT * FROM departments;', (err, result) => {
        if (err) throw err;

        console.log(`\nDepartments Table`);
        console.table(result);
        console.log('\n');

        callback();
    });
}

module.exports = viewDepartments;