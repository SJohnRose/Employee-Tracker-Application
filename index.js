//  import the inquirer and MySql2 packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

const choiceList = ['View all employees', 'Add Employee', 'Update Employee Role', 'View all roles', 'Add Role', 'View all departments', 'Quit'];

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
  
//   db.query('SELECT * FROM role', function (err, results) {
//     console.log(results);
//   });
  
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
        runQuery(selection.userChoice);
               
    }
}

function runQuery(userChoice) {
    switch(userChoice) {
        case choiceList[0]: console.log(choiceList[0] + ' selected');
                            break;
        case choiceList[1]: console.log(choiceList[1] + ' selected');
                            break;
        case choiceList[2]: console.log(choiceList[2] + ' selected');
                            break;
        case choiceList[3]: console.log(choiceList[3] + ' selected');
                            break;
        case choiceList[4]: console.log(choiceList[4] + ' selected');
                            break;
        case choiceList[5]: console.log(choiceList[5] + ' selected');
                            break;
        case choiceList[6]: process.exit(0);
    }
}

askQuestions();