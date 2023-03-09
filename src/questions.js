//const db = require('./dbConnection');

    
const newEmployeeQuestions = [   
    {
      name: 'firstName',
      message: 'What is the first name of the employee?'
    },
    {
      name: 'lastName',
      message: 'What is the last name of the employee?'
    },
    {
      name: 'managerID',
      message: 'What is the manager ID of the employee?'
    },
    {
      name: 'newRole',
      message : 'What is the role?',
      type: 'list',
      
    }
]

const newRoleQuestions = [
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
    type: 'list'
  },
  ]

const updateEmployeeQuestions = [
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
    
  },
  ]  

module.exports = newEmployeeQuestions;
module.exports = newRoleQuestions;
module.exports = updateEmployeeQuestions;