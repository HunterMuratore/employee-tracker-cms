const inquirer = require('inquirer');
const { db } = require('../db/db');

function addEmployee(callback) {
    db.query('SELECT * FROM employees WHERE manager_id IS NULL', (err, managers) => {
        if (err) throw err;

        let managerChoices = [];

        managers.forEach(manager => {
            managerChoices.push(`${manager.first_name} ${manager.last_name}`);
        });

        db.query('SELECT * FROM roles;', (err, roles) => {
            if (err) throw err

            let roleChoices = [];

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
                    // Add employee to the database
                    const { first_name, last_name, role, manager } = answers;

                    const selectedRole = roles.find(findRole => findRole.title === role);
                    const role_id = selectedRole.id;

                    const selectedManager = managers.find(findManager => `${findManager.first_name} ${findManager.last_name}` === manager);
                    const manager_id = selectedManager.id;

                    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                    const params = [first_name, last_name, role_id, manager_id];
                
                    db.query(sql, params, (err, results) => {
                      if (err) return console.error('Error adding employee:', err);

                      console.log(`Successfully added ${first_name} ${last_name} to the database`);

                      callback();
                    });
                });
        });    
    });
}

module.exports = addEmployee;