USE employee_db;


INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Accounts Payable");





INSERT INTO role (title, salary, department_id) 
VALUES ("Legal Assistant", 50000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Support", 85000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("AP Clerk", 45000.00, 3);







INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Mike", "Chan", 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", 3, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kevin", "Tupik", 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ashley", "Rodriguez", 4);





 

 