const mysql = require('mysql2');

// Check the database connection before starting the prompts
function checkConnection(callback) {
  db.connect((err) => {
    if (err) {
      console.error('\nError connecting to the database: ' + err.message);
    } else {
      console.log('\nConnected to the employee_tracker database.\n\n');
      callback();
    }
  });
}

const db = mysql.createConnection(
  {
    host: 'localhost', 
    user: 'root',
    database: 'employee_tracker'
  },
);

module.exports = { db, checkConnection }