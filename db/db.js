const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost', 
      user: 'root',
      password: 'pass',
      database: 'employee_tracker'
    },
    console.log(`Connected to the employee_tracker database.\n`)
);

module.exports = { db };