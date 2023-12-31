-- Get all employees by roles and departments
SELECT
        e.id,
        e.first_name,
        e.last_name,
        r.title AS role_title,
        d.name AS department,
        CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employees e 
        JOIN roles r
            ON e.role_id = r.id
        JOIN departments d
            ON r.department_id = d.id
        LEFT JOIN employees managers
            ON e.manager_id = managers.id;

-- Get all employees by specific roles
SELECT
    e.first_name,
    e.last_name,
    r.title AS role_title,
    d.name AS department
        from employees e
            JOIN roles r    
                ON e.role_id = r.id 
            JOIN departments d
                ON r.department_id = d.id
        WHERE r.id = 1; -- Need to pass in the role id here instead of 1 to get all employees in that specific role

-- Get all roles with their departments
SELECT
    r.title,
    r.salary,
    d.name AS department
        FROM roles r
            JOIN departments d   
                ON r.department_id = d.id; 
