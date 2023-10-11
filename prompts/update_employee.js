const inquirer = require('inquirer');
const { db } = require('../db/db');

function updateEmployee(callback) {
    db.query('SELECT * FROM employees', (err, employees) => {
        if (err) throw err;

        let employeeChoices = [];

        // Loop through all of the employees in the database and add them to an array so they can be displayed in the choices portion of the prompt
        employees.forEach(employee => {
            employeeChoices.push(`${employee.first_name} ${employee.last_name}`);
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
                    type: 'list',
                    name: 'employee',
                    message: 'which employee\'s role do you want to update?',
                    choices: employeeChoices // Show all employees from the db
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'which role do you want to assign the selected employee?',
                    choices: roleChoices // Show all roles from the db
                }]).then((answers) => {
                    const { employee, role } = answers;
                    
                    // Find the employee object the user chose in the database
                    const selectedEmployee = employees.find(findEmployee => `${findEmployee.first_name} ${findEmployee.last_name}` === employee);
                    // Set the correct employee id to a variable to pass into the db.query 
                    const employee_id = selectedEmployee.id;

                    // Find the role object the user chose in the database
                    const selectedRole = roles.find(findRole => findRole.title === role);
                    // Set the correct role id to a variable to pass into the db.query 
                    const role_id = selectedRole.id;
                    
                    const sql = 'UPDATE employees SET role_id=? WHERE id=?';
                    const params = [ role_id, employee_id];
                    
                    // Add employee to the database with the correct role and manager id
                    db.query(sql, params, (err, results) => {
                      if (err) return console.error('Error updating employee:', err);

                      console.log(`\nSuccessfully updated ${employee}'s role\n`);

                      callback();
                    });
                });
        });    
    });
}

module.exports = updateEmployee;