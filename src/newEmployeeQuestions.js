const db = require('../src/dbConnection');

    
const questions = [   
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
]


module.exports = questions;
