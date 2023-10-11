const inquirer = require('inquirer');
const { db } = require('../db/db');

function addRole(callback) {
    db.query('SELECT * FROM departments', (err, departments) => {
        if (err) throw err;

        let departmentChoices = [];

        departments.forEach(department => {
            departmentChoices.push(department);
        });
    
        inquirer
            .prompt([{
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
                choices: departmentChoices // Show all departments from the db
            }]).then((answers) => {
                // Add role to the database
                const { role, salary, department } = answers;

                const selectedDepartment = departments.find(dep => dep.name === department);
                const department_id = selectedDepartment.id;

                const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
                const params = [role, salary, department_id];
            
                db.query(sql, params, (err, results) => {
                  if (err) return console.error('Error adding role:', err);
                
                  console.log(`Successfully added ${role} to the database`);

                  callback();
                });
            });
    });
}

module.exports = addRole;