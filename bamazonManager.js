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
    .then(function(answers) {
        var selection = answers.selection;
        if (selection === "Products for Sale") {
          connection.query("SELECT * FROM product", function(err, res) {
            if (err) {
              throw err;
            }
            console.table(res);
          });
        } else if (selection === "View Low Inventory") {
          connection.query(
            "SELECT * FROM product WHERE stock_quantity < 5",
            function(err, res) {
              if (err) {
                throw err;
              }
              console.table(res);
            }
          );
        } else if (selection === "Add to Inventory") {
          connection.query("SELECT * FROM product", function(err, res) {
            if (err) {
              throw err;
            }
            var choices = [];
            for (var i = 0; i < res.length; i++) {
              choices.push(res[i].item_id + "");
            }
    
            inquirer
              .prompt([
                {
                  type: "list",
                  message: "What Item would you like to add stock for?",
                  name: "item_id",
                  choices: choices
                },
                {
                  type: "input",
                  message: "How many would you like to add?",
                  name: "quantity"
                }
              ])
              .then(function(answers) {
                connection.query(
                  "SELECT * FROM product WHERE item_id = ?",
                  [answers.item_id],
                  function(err, res) {
                    if (err) {
                      throw err;
                    }
                    var quantity = res[0].stock_quantity;
    
                    connection.query(
                      "UPDATE product SET ? WHERE item_id = ?",
                      [
                        {
                          stock_quantity:
                            parseInt(quantity) + parseInt(answers.quantity)
                        },
                        answers.item_id
                      ],
                      function(err, res) {
                        if (err) {
                          throw err;
                        }
                        console.log(res);
                      }
                    );
                  }
                );
              });
          });
        } else if (selection === "Add New Product") {
          connection.query("SELECT * FROM department", function(err, res) {
            if (err) {
              throw err;
            }
            var choices = [];
            for (var i = 0; i < res.length; i++) {
              choices.push(res[i].department_id + "");
            }
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "What is your product named?",
                  name: "product_name"
                },
                {
                  type: "input",
                  message: "How much does your product cost?",
                  name: "price"
                },
                {
                  type: "input",
                  message: "How much does your product have initially in stock?",
                  name: "stock_quantity"
                },
                {
                  type: "list",
                  message: "What department would you like to add this item to?",
                  name: "department_id",
                  choices: choices
                }
              ])
              .then(function(answers) {
                connection.query(
                  "INSERT INTO product SET ?",
                  [
                    {
                      product_name: answers.product_name,
                      price: parseFloat(answers.price),
                      stock_quantity: parseInt(answers.stock_quantity),
                      department_id: parseInt(answers.department_id),
                      product_sales: 0
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
          });
        }
      });
    