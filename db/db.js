const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost', 
      user: 'root',
      database: 'employee_tracker'
    },
);

db.connect((err) => {
  if (err) {
    console.error('\n\nError connecting to the database: ' + err.message);
  } else {
    console.log('\n\nConnected to the employee_tracker database.');
  }
});

module.exports = db;