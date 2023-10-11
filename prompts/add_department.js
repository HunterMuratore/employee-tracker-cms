const inquirer = require('inquirer');
const { db } = require('../db/db');

function addDepartment(callback) {
    inquirer
        .prompt({
            name: 'department',
            message: 'What is the name of the department?'
        }).then((answers) => {
            const { department } = answers;
            const sql = 'INSERT INTO departments (name) VALUES (?)';
            const params = [department];
            
            // Add department to the database
            db.query(sql, params, (err, results) => {
              if (err) return console.error('Error adding department:', err);
                
              console.log(`\nSuccessfully added ${department} to the database\n`);
              
              callback();
            });
        });
}

module.exports = addDepartment;