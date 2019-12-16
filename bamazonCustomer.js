let inquirer = require("inquirer");
let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "helloworld",
  database: "bamazon"
});

connection.connect(function(err, res) {
  if (err) throw err;
  console.log("Connection has been made");
});

connection.query("SELECT * FROM product", function(err, res) {
  if (err) throw err;
  // console.table(res);

  let choices = [];
  for (let i = 0; i < res.length; i++) {
    choices.push(res[i].item_id);
    // console.log(choices);
  }

  inquirer
    .prompt([
      {
        type: "list",
        message: "What item would you like to buy",
        name: "item_id",
        choices: choices
      },
      {
        type: "input",
        message: "How many would you like to buy",
        name: "quantity"
      }
    ])
    .then(function(answers) {
      connection.query(
        "SELECT * FROM product WHERE item_id = ?",
        [answers.item_id],
        function(err, res) {
          if (err) throw err;
          let quantity = res[0].stock_quantity;
          let price = res[0].price;
          let product_sales = res[0].product_sales;
          if (answers.quantity > quantity) {
            console.log("Insufficient quantity!");
          } else {
            connection.query(
              "UPDATE product SET ? WHERE item_id = ?",
              [
                {
                  stock_quantity: quantity - answers.quantity,
                  product_sales: product_sales + price * answers.quantity
                },
                answers.item_id
              ],
              function(err, res) {
                if (err) throw err;
                console.log(
                  "Your purchase cost you: $" + price * answers.quantity
                );
              }
            );
          }
        }
      );
    });
});
