const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost', 
      user: 'root',
      password: 'pass',
      database: '[database_name]'
    },
    console.log(`Connected to the [database_name] database.`)
);

function init() {
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
        });
}

function viewDepartments() {

}

function viewRoles() {

}

function viewEmployees() {

}

function addDepartment() {
    inquirer
        .prompt({
            name: 'department',
            message: 'What is the name of the department?'
        }).then((answer) => {
            // Add department to the database
            console.log(`Added ${answer.department} to the database`);
        });
}

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
        });
}

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
        });
}

function updateEmployee() {
    inquirer
        .prompt({
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
        }).then((answer) => {
            // Update employee in the database
            console.log(`Updated ${answer.firstName} ${answer.lastName}'s role`);
        });
}

init();