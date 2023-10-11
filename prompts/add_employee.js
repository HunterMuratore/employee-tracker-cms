const inquirer = require('inquirer');
const { db } = require('../db/db');

function addEmployee(callback) {
    db.query('SELECT * FROM employees WHERE manager_id IS NULL', (err, managers) => {
        if (err) throw err;

        let managerChoices = [];

        // Loop through all of the managers in the database and add them to an array so they can be displayed in the choices portion of the prompt
        managers.forEach(manager => {
            managerChoices.push(`${manager.first_name} ${manager.last_name}`);
        });

        db.query('SELECT * FROM roles;', (err, roles) => {
            if (err) throw err

            let roleChoices = [];

            // Loop through all of the roles in the database and add them to an array sthey can be displayed in the choices portion of the prompt
            roles.forEach(role => {
                roleChoices.push(role.title);
            });

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
                    choices: roleChoices // Show all roles from the db
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the employee\'s manager?',
                    choices: managerChoices // Show all managers from the db
                }]).then((answers) => {
                    const { first_name, last_name, role, manager } = answers;
                    
                    // Find the role object the user chose in the database
                    const selectedRole = roles.find(findRole => findRole.title === role);
                    // Set the correct role id to a variable to pass into the db.query 
                    const role_id = selectedRole.id;
                    
                    // Find the manager object the user chose in the database
                    const selectedManager = managers.find(findManager => `${findManager.first_name} ${findManager.last_name}` === manager);
                    // Set the correct manager id to a variable to pass into the db.query 
                    const manager_id = selectedManager.id;
                    
                    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                    const params = [first_name, last_name, role_id, manager_id];
                    
                    // Add employee to the database with the correct role and manager id
                    db.query(sql, params, (err, results) => {
                      if (err) return console.error('Error adding employee:', err);

                      console.log(`\nSuccessfully added ${first_name} ${last_name} to the database\n`);

                      callback();
                    });
                });
        });    
    });
}

module.exports = addEmployee;