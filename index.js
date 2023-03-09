//  import the inquirer and console.table packages
const inquirer = require('inquirer');
const tableData = require('console.table');

const db = require('./src/dbConnection');
const newEmployeeQuestions = require('./src/questions');
const newRoleQuestions = require('./src/questions');
const updateEmployeeQuestions = require('./src/questions');
const Query = require('./src/queries') ;

const { version } = require('os');

// Declare global variables
const choiceList = ['View all employees', 'Add Employee', 'Update Employee Role', 'View all roles', 'Add Role', 'View all departments', 'Quit'];
var selection, queryStr;
var QueryObj = new Query(); 


// Function to start the process
async function askQuestions() {
  console.clear();
  console.log("****** EMPLOYEE TRACKER APPLICATION **********");
  while(true) {
    selection = await inquirer.prompt([
    {
      waitUserInput: true,
      name: 'userChoice',
      message: 'What would you like to do?',
      type: 'list',
      choices: choiceList,
    }
    ]);
    switch(selection.userChoice) {
      case choiceList[0]: queryStr = QueryObj.viewEmployees();
                          runQuery(queryStr);
                          break;
      case choiceList[1]: newEmployeeQuestions[3].choices = await getRoles();
                          var newEmployee = await inquirer.prompt(newEmployeeQuestions);
                          var roleID = await getRoleID(newEmployee.newRole);              
                          queryStr = QueryObj.addEmployee(newEmployee,roleID);
                          db.execute(queryStr, function (err, results) {
                            console.log('\n');
                          }); 
                          break;
      case choiceList[2]: updateEmployeeQuestions[2].choices = await getRoles();
                          var updateDetails = await inquirer.prompt(updateEmployeeQuestions);
                          roleID = await getRoleID(updateDetails.newRole);
                          queryStr = QueryObj.upDateEmployeeRole(updateDetails, roleID);
                          runQuery(queryStr);
                          break;
      case choiceList[3]: queryStr = QueryObj.viewRoles();
                          runQuery(queryStr);
                          break;
      case choiceList[4]: newRoleQuestions[2].choices = await getDepts();
                          var newRole = await inquirer.prompt(newRoleQuestions)
                          var deptID = await getDeptID(newRole.roleDept);
                          queryStr = QueryObj.addRole(newRole, deptID);
                          runQuery(queryStr);
                          break;
      case choiceList[5]: queryStr = QueryObj.viewDepartments();
                          runQuery(queryStr);
                          break;
      case choiceList[6]: process.exit(0);
    } 
    
  }
  
}

// Function to run each query
function runQuery(query) {
  db.query(query, function (err, results) {
    console.log('\n');
    console.table(results);
    console.log('\n\n');
  });
}

// Function that returns all roles from Role table
async function getRoles() {
  var sql = 'SELECT title FROM role';
  const results = await db.promise().query(sql)
  return(results[0].map((entry) => entry.title));
}
  
//  Function that returns all department names from Department table
async function getDepts() {
  var sql = 'SELECT name FROM department';
  const results = await db.promise().query(sql);
  //console.log(results[0].map((entry) => entry.name));
  return(results[0].map((entry) => entry.name));
  
}

// Function that returns role id if given the role title
async function getRoleID(role) {
  var sql = `SELECT id from role where title = '${role}';`;
  const results = await db.promise().query(sql);
  return(results[0][0]["id"]);
}

// Function that returns dept id if given the dept name
async function getDeptID(dept) {
  var sql = `SELECT id from department where name = '${dept}';`;
  const results = await db.promise().query(sql);
  return(results[0][0]["id"]);
}

askQuestions();