//  import the inquirer and MySql2 packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to the employee database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'MySQL123#',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  
  db.query('SELECT * FROM role', function (err, results) {
    console.log(results);
  });
  