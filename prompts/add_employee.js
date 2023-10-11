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
            const { first_name, last_name, role, manager } = answers;
            const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            const params = [first_name, last_name, role, manager];
      
            db.query(sql, params, (err, results) => {
              if (err) console.error('Error adding employee:', err);
                console.log(`Successfully added ${answer.firstName} ${answer.lastName} to the database`);
            });
            mainMenu();
        });
}

module.exports = { addEmployee };