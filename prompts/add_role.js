const inquirer = require('inquirer');
const { db } = require('../db/db');

function addRole(callback) {
    inquirer
        .prompt([{
            name: 'role',
            message: 'What is the name of the role?'
        },
        {
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does the role belong to?',
            choices: ['department'] // Show all departments from the db
        }]).then((answers) => {
            // Add role to the database
            const { role, salary, department } = answers;
            const sql = 'INSERT INTO roles (role, salary, department) VALUES (?, ?, ?)';
            const params = [role, salary, department];
      
            db.query(sql, params, (err, results) => {
              if (err) return console.error('Error adding role:', err);
            
              console.log(`Successfully added ${role} to the database`);

              callback();
            });
        });
}

module.exports = addRole;