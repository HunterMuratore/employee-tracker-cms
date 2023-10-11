const inquirer = require('inquirer');
const { db } = require('../db/db');

function updateEmployee(callback) {
    inquirer
        .prompt([{
            type: 'list',
            name: 'employee',
            message: 'which employee\'s role do you want to update?',
            choices: ['employees'] // Show all employees from the db
        },
        {
            type: 'list',
            name: 'manager',
            message: 'which role do you want to assign the selected employee?',
            choices: ['roles'] // Show all roles from the db
        }]).then((answer) => {
            // Update employee in the database
            console.log(`Updated ${answer.firstName} ${answer.lastName}'s role`);

            callback();
        });
}

module.exports = updateEmployee;