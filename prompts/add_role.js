const inquirer = require('inquirer');
const db = require('../db/db');

function addRole() {
    inquirer
        .prompt({
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
        }).then((answer) => {
            // Add role to the database
            console.log(`Added ${answer.role} to the database`);
            mainMenu();
        });
}