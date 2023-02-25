class Query {
    constructor(answers) {
        this.answers = answers;
        
    }
    viewEmployees() {
        var queryStr = 'SELECT * FROM employee;';
        return queryStr;
    }

    addEmployee() {
        var queryStr = `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
                          VALUES ('${this.answers.firstName}', 
                          '${this.answers.lastName}', ${this.answers.role_id}, '${this.answers.manager_id}');`;
        return queryStr;
    }

    upDateEmployeeRole() {

    }

    viewRoles() {

    }

    addRole() {

    }

    viewDepartments() {

    }
}

module.exports = Query
