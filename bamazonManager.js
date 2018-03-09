var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var productID = 0;
var productQTY = 0;
var stockQTY = 0;
var productPrice = 0;
var menuChoice = 0;

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
  promptMgr();
});

function promptMgr() {
  // function which prompts the user for what they would like to purchase
  inquirer
    .prompt({
      type: "rawlist",
      name: "mgrMenu",
      message: "Choose from the following menu items:",
      choices: [
        { name: 'View Products for Sale', value: 1, checked: false },
        { name: 'View Low Inventory', value: 2, checked: false },
        { name: 'Add to Inventory', value: 3, checked: false },
        { name: 'Add New Product', value: 4, checked: false },
      ]
    })
    .then(function(answer) {
      
      displayMenuChoice(answer.mgrMenu);
    });
}
 
//Display products for managers
function displayMenuChoice(menuChoice) {
  connection.query("SELECT * FROM products", function(err, res) {
    
    if (err) throw err;

    var table = new Table({
      head: ['Product ID', 'Product Name', 'Product Price', 'Qty-In-Stock']
    , colWidths: [15, 50, 15, 15]
  });  
    
    if (menuChoice === 1) {
      for (var i = 0; i < res.length; i++) {
        table.push([res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity]);
      } 

      console.log("====================================================================================================");
      console.log("====================================================================================================");
      console.log(table.toString());
      promptMgr()

    } else if (menuChoice === 2) {
      for (var i = 0; i < res.length; i++) {
          
        if (res[i].stock_quantity < 5) {
          table.push([res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity]);
        }
      }
      console.log("====================================================================================================");
      console.log("====================================================================================================");
      console.log(table.toString());
      promptMgr()

    } else if (menuChoice === 3) {
        for (var i = 0; i < res.length; i++) {
            
        table.push([res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity]);
        } 
        console.log("====================================================================================================");
        console.log("====================================================================================================");
        console.log(table.toString());

        inquirer
          .prompt({
            type: "input",
            name: "itemID",
            message: "Choose the ID of the product whose inventory you wish to increase.",
          })
          .then(function(answer) {
          productID = answer.itemID;
          });

        inquirer
          .prompt({
            type: "input",
            name: "itemQTY",
            message: "Enter the quantity you would like to add.",
          })
          .then(function(answer) {
          productQTY = answer.itemQTY;
        });

        connection.query("UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: productQTY
            },
            {
              id: productID  
            },
          ], function(err, res) {
            if (err) throw err;
          });
        console.log("Product quantity has been updated");
        promptMgr()

    } else {
      inquirer
      .prompt({
        type: "input",
        name: "itemName",
        message: "What is the new product's name?",
      })
      .then(function(answer) {
        productName = answer.itemName;
      });

      inquirer
      .prompt({
        type: "input",
        name: "dept",
        message: "What is the department name?",
      })
      .then(function(answer) {
        productDept = answer.dept;
      });

      inquirer
      .prompt({
        type: "input",
        name: "price",
        message: "What is the price of the new product?",
      })
      .then(function(answer) {
        productPrice = answer.price;
      });

      inquirer
      .prompt({
        type: "input",
        name: "qty",
        message: "What is the quantity added?",
      })
      .then(function(answer) {
        productQty = answer.qty;
      });
      console.log(answer.itemName);
      console.log(answer.dept);
      console.log(answer.price);
      console.log(answer.qty);


      connection.query("INSERT INTO products", (product_name, department_name, price, stock_quantity),
      VALUES (answer.itemName, answer.dept, answer.price, answer.qty), function(err, res) {
            if (err) throw err;
          });
        console.log("New product has been added.");
        promptMgr()
    }

  });      
};