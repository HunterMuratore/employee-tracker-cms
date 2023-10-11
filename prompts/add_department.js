const inquirer = require('inquirer');
const db = require('../db/db');

function addDepartment() {
    inquirer
        .prompt({
            name: 'department',
            message: 'What is the name of the department?'
        }).then((answer) => {
            // Add department to the database
            console.log(`Added ${answer.department} to the database`);
            mainMenu();
        });
}

module.exports = { addDepartment };