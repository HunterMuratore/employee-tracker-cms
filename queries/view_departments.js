const db = require('../db/db');

db.query('SELECT * FROM departments;', (err, result) => {
    if (err) throw err;

    console.log(result);
});