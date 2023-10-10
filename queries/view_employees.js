const db = require('../db/db');

db.query('SELECT * FROM employees;', (err, result) => {
    if (err) throw err;

    console.log(result);
});