const fs = require('fs');
const inquirer = require('inquirer');
const db = require('./db/db');
const { addDepartment, addRole, addEmployee, updateEmployee } = require('./prompts');

// Create an array that will hold all of the queries from query.sql
const sqlQueries = fs.readFileSync('./db/query.sql', 'utf-8').split(';');

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
            switch (answer) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
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