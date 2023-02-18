INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales person", 60000 , 1),
       ("Accounts Manager", 120000, 3),
       ("Lawyer", 80000, 4 ),
       ("Legal Team Lead", 100000, 4 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Cutter", 2, NULL),
       ("Kate", "Whitten", 1, NULL),
       ("Lynda", "Wilson", 3, 4),
       ("Ashlin", "Brown", 4, NULL);
