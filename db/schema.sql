DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id)
        REFERENCES departments (id)
        ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id)
        REFERENCES roles (id)
        ON DELETE CASCADE,
    FOREIGN KEY (manager_id)
        REFERENCES students (id)
        ON DELETE SET NULL
);