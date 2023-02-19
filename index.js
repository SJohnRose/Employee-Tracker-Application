//  import the inquirer, MySql2 and console.table packages
const inquirer = require('inquirer');
//const mysql = require('mysql2');
const tableData = require('console.table');
const db = require('./src/dbConnection');

const newEmployeeQuestions = require("./src/newEmployeeQuestions");

const { version } = require('os');


const choiceList = ['View all employees', 'Add Employee', 'Update Employee Role', 'View all roles', 'Add Role', 'View all departments', 'Quit'];

function getAllRoles() {
  var roles = db.query('SELECT title FROM role', function (err, results) {
    console.log(results);
  });
  
  return roles;
}

async function askQuestions() {
  while(true) {
        var selection = await inquirer.prompt([
        {
            name: 'userChoice',
            message: 'What would you like to do?',
            type: 'list',
            choices: choiceList,
        }
        ]);
        switch(selection.userChoice) {
          case choiceList[0]: console.log(choiceList[0] + ' selected');
                              db.query('SELECT * FROM employee', function (err, results) {
                                console.log('\n');
                                console.table(results);
                              });
                              break;
          case choiceList[1]: console.log(choiceList[1] + ' selected');
                              var newEmployee = await inquirer.prompt(newEmployeeQuestions);
                              var queryStr = `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
                                              VALUES ('${newEmployee.firstName}', '${newEmployee.lastName}', ${newEmployee.role_id}, '${newEmployee.manager_id}');`;
                              db.execute(queryStr, function (err, results) {
                                  console.log('\n');
                                  
                              });               
                              break;
          case choiceList[2]: console.log(choiceList[2] + ' selected');
                              var updateEmployee = await inquirer.prompt([
                              {
                                name: 'updateName',
                                message :"What is the employee's name to update?",
                              },
                              {
                                name: 'newRole',
                                message : "What is the new role?",
                                choices : getAllRoles(),
                              },
                              ]);
                              db.query('UPDATE employee SET role_id = ', function (err, results) {
                                console.log('\n');
                                console.table(results);
                              });
                              break;
          case choiceList[3]: console.log(choiceList[3] + ' selected');
                              db.query('SELECT * FROM role', function (err, results) {
                                console.log('\n');
                                console.table(results);
                              });
                              break;
          case choiceList[4]: console.log(choiceList[4] + ' selected');
                              break;
          case choiceList[5]: console.log(choiceList[5] + ' selected');
                              db.query('SELECT * FROM department', function (err, results) {
                                console.log('\n');
                                console.table(results);
                              });
                              break;
          case choiceList[6]: process.exit(0);
      }      
    }
}



askQuestions();