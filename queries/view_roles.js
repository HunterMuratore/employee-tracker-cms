const db = require('../db/db');

db.query('SELECT * FROM roles;', (err, result) => {
    if (err) throw err;

    console.log(result);
});