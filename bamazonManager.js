let inquirer = require("inquirer");
let mysql = require("mysql");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
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
        choices: [
          "Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
      /* Pass your questions in here */
    ])
    