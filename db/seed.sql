USE employee_tracker;

INSERT INTO departments (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Lead Engineer', 180000, 2),
    ('Software Engineer', 130000, 2),
    ('Lawyer', 250000, 4),
    ('Sales Lead', 80000, 1),
    ('Accountant', 100000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Tom', 'Riddle', 1, NULL),
    ('Severus', 'Snape', 2, 1),
    ('Albus', 'Dumbledore', 5, NULL),
    ('Rubeus', 'Hagrid', 4, 3),
    ('Harry', 'Potter', 5, 3),
    ('Hermione', 'Granger', 3, NULL),
    ('Ron', 'Weasley', 3, 6);
