class Query {
    
    viewEmployees() {
        var queryStr = `SELECT e.id, first_name, last_name, title, d.name as department, salary, manager_id FROM employee e 
                        LEFT JOIN role on e.role_id = role.id 
                        LEFT JOIN department d on role.department_id = d.id`;
        return queryStr;
    }

    addEmployee(answers, role) {
        var queryStr = `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
                          VALUES ('${answers.firstName}', 
                          '${answers.lastName}', ${role}, '${answers.managerID}');`;
        return queryStr;
    }

    upDateEmployeeRole(answers, role) {
        var queryStr = `UPDATE employee SET role_id = ${role} where first_name = '${answers.firstName}' AND 
                        last_name = '${answers.lastName}';`;
        return queryStr;
    }

    viewRoles() {
        var queryStr = 'SELECT id, title FROM role;';
        return queryStr;

    }

    addRole(answers, dept) {
        var queryStr = `INSERT INTO role(title, salary, department_id) 
                          VALUES ('${answers.roleTitle}', 
                          ${answers.salary}, ${dept});`;
        return queryStr;
    }

    viewDepartments() {
        var queryStr = 'SELECT * FROM department;';
        return queryStr;
    }
}

module.exports = Query
