const inquirer = require('inquirer');
const { db } = require('../db/db');

function addEmployee(callback) {
    db.query('SELECT * FROM roles;', (err, roles) => {
        if (err) throw err

        inquirer
        .prompt([{
            name: 'first_name',
            message: 'What is the employee\'s first name?'
        },
        {
            name: 'last_name',
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
        }]).then((answers) => {
            // Add employee to the database
            const { first_name, last_name, role, manager } = answers;
            const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            const params = [first_name, last_name, role, manager];
      
            db.query(sql, params, (err, results) => {
              if (err) return console.error('Error adding employee:', err);
                
              console.log(`Successfully added ${first_name} ${last_name} to the database`);

              callback();
            });
        });
    });    
}

module.exports = addEmployee;