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

//Display all ids, products, and prices for the user
function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      
      if (err) throw err;
      
      for (var i = 0; i < res.length; i++) {
        // table is an Array, so you can `push`, `unshift`, `splice` and friends 
        table.push([res[i].id, res[i].product_name, res[i].price]);
      } 
      console.log(table.toString());

      findID();
      
    });      
};

// function which prompts the user for what they would like to purchase
function findID() {  
    inquirer
      .prompt({
        type: "input",
        name: "itemID",
        message: "Choose the ID of the product you would like to purchase.",
      })
      .then(function(answer) {
        productID = answer.itemID;

        findQty();
      });
}

// function which prompts the user for the quantity of product needed

function findQty () {
  inquirer
      .prompt({
        type: "input",
        name: "itemQTY",
        message: "Enter the quantity you would like to purchase.",
      })
      .then(function(answer) {
        productQTY = answer.itemQTY;
        getQty();
      });
}

// get the quantity of the desired product

function getQty() {
  connection.query("SELECT stock_quantity FROM products WHERE id=?", [productID], function(err, res) {
    if (err) throw err;  

  stockQTY = res[0].stock_quantity;
    
  console.log(stockQTY);

  checkQty(stockQTY); 
  });  

  // check if there is enough of the product in stock to meet the customer's request

  function checkQty(qty) {
  if (qty - productQTY < 0) {
    
    inquirer
      .prompt({
      type: "input",
      name: "tryAgain",
      message: "Insufficient quantity on hand. Try ordering a smaller amount.",
    })
    .then(function(answer) {
    productQTY = answer.tryAgain;
    checkQty();
    });
  
  } else {
    connection.query("UPDATE products SET ? WHERE ?",
    [
        {
            stock_quantity: stockQTY - productQTY
        },
        {
            id: productID  
        },
    ],
    function(err, res) {
      if (err) throw err;

      connection.end();
    }
  );
  totalCost();
};


}

function totalCost() {
  connection.query("SELECT price FROM products WHERE id=?", [productID],function(err, res) {
      if (err) throw err;

      cost = res[0].price * productQTY;
      console.log("The total price of your purchase is $" + cost + ".")
    }
 );
}

        
      





}




  