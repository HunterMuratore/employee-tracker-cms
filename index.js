const fs = require('fs');
const inquirer = require('inquirer');
const { addDepartment, addRole, addEmployee, updateEmployee } = require('./prompts');
const { viewTable } = require('./queries');
console.log(viewTable, addDepartment, addEmployee, addRole, updateEmployee);

// Create an array that will hold all of the queries from query.sql
// const sqlQueries = fs.readFileSync('./db/query.sql', 'utf-8').split(';');

function init() {
    mainMenu();
}

function mainMenu() {
    inquirer
        .prompt({
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }).then((answer) => {
            switch (answer.options) {
                case 'View all departments':
                    viewTable('departments');
                    break;
                case 'View all roles':
                    viewTable('roles');
                    break;
                case 'View all employees':
                    viewTable('employees');
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployee();
                    break;
            }
            mainMenu();
        });
}

init();
