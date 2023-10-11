const fs = require('fs');
const inquirer = require('inquirer');
const { addDepartment, addRole, addEmployee, updateEmployee } = require('./prompts');
const { viewTable } = require('./queries');
const { checkConnection } = require('./db/db');

// Create an array that will hold all of the queries from query.sql
// const sqlQueries = fs.readFileSync('./db/query.sql', 'utf-8').split(';');

function init() {
    checkConnection(() => mainMenu());
}

function mainMenu() {
    inquirer
        .prompt({
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }).then((answer) => {
            handleMenuOption(answer.options);
        });
}

function handleMenuOption(option) {
    switch (option) {
        case 'View all departments':
            viewTable('departments', () => mainMenu());
            break;
        case 'View all roles':
            viewTable('roles', () => mainMenu());
            break;
        case 'View all employees':
            viewTable('employees', () => mainMenu());
            break;
        case 'Add a department':
            addDepartment(() => mainMenu());
            break;
        case 'Add a role':
            addRole(() => mainMenu());
            break;
        case 'Add an employee':
            addEmployee(() => mainMenu());
            break;
        case 'Update an employee role':
            updateEmployee(() => mainMenu());
            break;
        default:
            mainMenu();
            break;
    }
}

init();
