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
