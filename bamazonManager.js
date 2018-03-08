var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var productID = 0;
var productQTY = 0;
var stockQTY = 0;
var productPrice = 0;
var cost = 0;
 
var table = new Table({
    head: ['Product ID', 'Product Name', 'Price']
  , colWidths: [15, 50, 15]
});

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // username
  user: "root",

  // password
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  displayProducts();
});