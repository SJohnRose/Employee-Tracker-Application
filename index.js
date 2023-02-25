//  import the inquirer and console.table packages
const inquirer = require('inquirer');
const tableData = require('console.table');

const db = require('./src/dbConnection');
const newEmployeeQuestions = require("./src/newEmployeeQuestions");
const Query = require('./src/queries') ;

const { version } = require('os');

const choiceList = ['View all employees', 'Add Employee', 'Update Employee Role', 'View all roles', 'Add Role', 'View all departments', 'Quit'];
var selection;
var QueryObj; 

function getAllRoles() {
  var roles = db.query('SELECT title FROM role', function (err, results) {
    console.log(results);
  });
  return roles;
}

async function askQuestions() {
  while(true) {
    selection = await inquirer.prompt([
    {
      name: 'userChoice',
      message: 'What would you like to do?',
      type: 'list',
      choices: choiceList,
    }
    ]);
    switch(selection.userChoice) {
      case choiceList[0]: console.log(choiceList[0] + ' selected');
                          var queryStr = 'SELECT * FROM employee;';
                          runQuery(queryStr);
                          break;
      case choiceList[1]: console.log(choiceList[1] + ' selected');
                          var newEmployee = await inquirer.prompt(newEmployeeQuestions);
                          QueryObj = new Query(newEmployee);
                          var queryStr = QueryObj.addEmployee();
                          // var queryStr = `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
                          // VALUES ('${newEmployee.firstName}', '${newEmployee.lastName}', ${newEmployee.role_id}, '${newEmployee.manager_id}');`;;
                          db.execute(queryStr, function (err, results) {
                            console.log('\n');
                          });               
                          break;
      case choiceList[2]: console.log(choiceList[2] + ' selected');
                          var updateEmployee = await inquirer.prompt([
                          {
                            name: 'firstName',
                            message :"What is the employee's first name?",
                          },
                          {
                          name: 'lastName',
                          message :"What is the employee's last name?",
                          },
                          {
                            name: 'newRole',
                            message : "What is the new role?",
                            choices : getAllRoles(),
                          },
                          ]);
                          var queryStr = `UPDATE employee SET role_id = '${updateEmployee.choices}' where first_name = '${updateEmployee.firstName}' 
                          and last_name = '${updateEmployee.lastName}';`
                          runQuery(queryStr);
                          break;
      case choiceList[3]: console.log(choiceList[3] + ' selected');
                          var queryStr = 'SELECT * FROM role';
                          runQuery(queryStr);
                          break;
      case choiceList[4]: console.log(choiceList[4] + ' selected');
                          break;
      case choiceList[5]: console.log(choiceList[5] + ' selected');
                          var queryStr = 'SELECT * FROM department';
                          runQuery(queryStr);
                          break;
      case choiceList[6]: process.exit(0);
    }      
  }
}

function runQuery(query) {
  db.query(query, function (err, results) {
    console.log('\n');
    console.table(results);
  });
}

askQuestions();