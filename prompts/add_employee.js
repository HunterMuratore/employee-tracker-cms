const inquirer = require('inquirer');
const db = require('../db/db');

function addEmployee() {
    inquirer
        .prompt({
            name: 'firstName',
            message: 'What is the employee\'s first name?'
        },
        {
            name: 'lastName',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: ['role'] // Show all roles from the db
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: ['manager'] // Show all employees from the db
        }).then((answer) => {
            // Add employee to the database
            console.log(`Added ${answer.firstName} ${answer.lastName} to the database`);
            mainMenu();
        });
}