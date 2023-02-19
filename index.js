//  import the inquirer, MySql2 and console.table packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const tableData = require('console.table');

const newEmployeeQuestions = require("./src/newEmployeeQuestions");
const { version } = require('os');


const choiceList = ['View all employees', 'Add Employee', 'Update Employee Role', 'View all roles', 'Add Role', 'View all departments', 'Quit'];

// Connect to the employee database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'MySQL123#',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  
  
  
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
                              var updateEmployee = await inquirer.prompt{[
                                name: ''
                              ]}
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