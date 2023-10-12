const inquirer = require('inquirer');
const { addDepartment, addRole, addEmployee, updateEmployee } = require('./prompts');
const { viewDepartments, viewEmployees, viewRoles } = require('./queries');
const { checkConnection } = require('./db/db');

function init() {
    checkConnection(() => mainMenu());
}

// Allow user's to choose any of the options and then pass it into the handler
function mainMenu() {
    inquirer
        .prompt({
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        }).then((answer) => {
            handleMenuOption(answer.options);
        });
}

// Call the correct function based off the user's choice
// Each function will have a callback to the mainMenu() allowing users to continuosly use the app
function handleMenuOption(option) {
    switch (option) {
        case 'View all departments':
            viewDepartments(() => mainMenu());
            break;
        case 'View all roles':
            viewRoles(() => mainMenu());
            break;
        case 'View all employees':
            viewEmployees(() => mainMenu());
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
        case 'Exit':
            console.log('Exiting the app...');
            process.exit(0);
    }
}

init();
