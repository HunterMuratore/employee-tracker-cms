const inquirer = require('inquirer');
const { db } = require('../db/db');

function addRole(callback) {
    // Get all of the departments from the database
    db.query('SELECT * FROM departments', (err, departments) => {
        if (err) throw err;

        let departmentChoices = [];

        // Loop through all of the departments in the database and add them to an array so they can be displayed in the choices portion of the prompt
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
                // Get all of the user's answers
                const { role, salary, department } = answers;
                
                // Find the department object the user chose in the database
                const selectedDepartment = departments.find(dep => dep.name === department);
                // Set the correct department id to a variable to pass into the db.query 
                const department_id = selectedDepartment.id;
                
                const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
                const params = [role, salary, department_id];
                
                // Add the role to the database with the associated department id
                db.query(sql, params, (err, results) => {
                  if (err) return console.error('Error adding role:', err);
                
                  console.log(`\nSuccessfully added ${role} to the database\n`);

                  callback();
                });
            });
    });
}

module.exports = addRole;