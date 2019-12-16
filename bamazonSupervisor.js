var inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "helloworld",
  database: "bamazon"
});

connection.connect(function(err, res) {
  if (err) {
    throw err;
  } else {
    //console.log("Database connection made!")
  }
});

inquirer
  .prompt([
    {
      type: "list",
      message: "What action would you like to do?",
      name: "selection",
      choices: ["View product Sales by Department", "Create New Department"]
    }
    /* Pass your questions in here */
  ])
  .then(function(answers) {
    var selection = answers.selection;
    if (selection === "View product Sales by Department") {
      connection.query(
        "SELECT department_name, SUM(over_head_costs), SUM(p.product_sales), SUM(p.product_sales) - SUM(over_head_costs) FROM department as d JOIN product as p on p.department_id = d.department_id GROUP BY department_name",
        function(err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
        }
      );
    } else if (selection === "Create New Department") {
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is your department named?",
            name: "department_name"
          },
          {
            type: "input",
            message: "How much does your department overhead?",
            name: "over_head_costs"
          }
        ])
        .then(function(answers) {
          connection.query(
            "INSERT INTO department SET ?",
            [
              {
                department_name: answers.department_name,
                over_head_costs: parseFloat(answers.over_head_costs)
              }
            ],
            function(err, res) {
              if (err) {
                throw err;
              }
              console.log(res);
            }
          );
        });
    }
  });
