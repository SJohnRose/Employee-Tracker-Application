//  import the inquirer and console.table packages
const inquirer = require('inquirer');
const tableData = require('console.table');

const db = require('./src/dbConnection');
const newEmployeeQuestions = require("./src/newEmployeeQuestions");
const Query = require('./src/queries') ;

const { version } = require('os');

const choiceList = ['View all employees', 'Add Employee', 'Update Employee Role', 'View all roles', 'Add Role', 'View all departments', 'Quit'];
var selection, queryStr;
var QueryObj = new Query(); 



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
                          queryStr = QueryObj.viewEmployees();
                          runQuery(queryStr);
                          break;
      case choiceList[1]: 
                          console.log(choiceList[1] + ' selected');
                          var newEmployee = await inquirer.prompt(newEmployeeQuestions);
                          var roleAnswer = await inquirer.prompt([
                          {
                            name: 'newRole',
                            message : "What is the role?",
                            type: 'list',
                            choices : await getRoles(),
                          },
                          ]);
                          var roleID = await getRoleID(roleAnswer.newRole);              
                          queryStr = QueryObj.addEmployee(newEmployee,roleID);
                          console.log(queryStr);
                          db.execute(queryStr, function (err, results) {
                            console.log('Employee Added');
                          }); 
                          //getRoles();
                          
                                  
                          break;
      case choiceList[2]: console.log(choiceList[2] + ' selected');
                          var updateDetails = await inquirer.prompt([
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
                            type: 'list',
                            choices : await getRoles(),
                          },
                          ]);
                          //var roleID = `SELECT id from role where title = '${updateDetails.newRole}';`;
                          roleID = await getRoleID(updateDetails.newRole);
                          queryStr = QueryObj.upDateEmployeeRole(updateDetails, roleID);
                          runQuery(queryStr);
                          break;
      case choiceList[3]: console.log(choiceList[3] + ' selected');
                          queryStr = QueryObj.viewRoles();
                          runQuery(queryStr);
                          break;
      case choiceList[4]: console.log(choiceList[4] + ' selected');
                          var newRole = await inquirer.prompt([
                          {
                            name: 'roleTitle',
                            message :"What is the title of new role?",
                          },
                          {
                            name: 'salary',
                            message :"What is the salary of the new role?",
                          },
                          {
                            name: 'roleDept',
                            message : "What is the department the new role belongs to?",
                            choices : await getDepts(),
                          },
                          ]);
                          var deptID = `SELECT id from department where name = '${newRole.roleDept}';`;
                          queryStr = QueryObj.addRole(newRole, deptID);
                          runQuery(queryStr);
                          break;
      case choiceList[5]: console.log(choiceList[5] + ' selected');
                          queryStr = QueryObj.viewDepartments();
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

async function getRoles() {
  var sql = 'SELECT title FROM role';
  const results = await db.promise().query(sql)
  return(results[0].map((entry) => entry.title));
}
  

async function getDepts() {
  var sql = 'SELECT name FROM department';
  const results = await db.promise().query(sql);
  return(results[0].map((entry) => entry.title));
  
}

async function getRoleID(role) {
  var sql = `SELECT id from role where title = '${role}';`;
  const results = await db.promise().query(sql);
  console.log(results[0][0]["id"]);
  return(results[0][0]["id"]);
}

askQuestions();