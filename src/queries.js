class Query {
    
    viewEmployees() {
        var queryStr = 'SELECT * FROM employee;';
        return queryStr;
    }

    addEmployee(answers, role) {
        var queryStr = `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
                          VALUES ('${answers.firstName}', 
                          '${answers.lastName}', ${role}, '${answers.manager_id}');`;
        return queryStr;
    }

    upDateEmployeeRole(answers, role) {
        var queryStr = `UPDATE employee SET role_id = ${role} where first_name = '${answers.firstName}' AND 
                        last_name = '${answers.lastName}';`;
        return queryStr;
    }

    viewRoles() {
        var queryStr = 'SELECT * FROM role;';
        return queryStr;

    }

    addRole(answers, dept) {
        var queryStr = `INSERT INTO role(title, salary, department) 
                          VALUES ('${answers.title}', 
                          ${answers.salary}, ${dept}');`;
        return queryStr;
    }

    viewDepartments() {
        var queryStr = 'SELECT * FROM department;';
        return queryStr;
    }
}

module.exports = Query
