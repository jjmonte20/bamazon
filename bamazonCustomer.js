var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // need user since my server seems to require it
    user: "root",
    // port
    port: 3306,

    // password
    password: "EpicGis20",

    // name of the database I want to show
    database: "bamazon_customerDB"
});

// needs a constructor for orders
function Order(name){
    this.name = name;
}

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    promptCustomerQuery();
});

function promptCustomerQuery() {
    console.log(
`
----------
Welcome to bamazon!
----------
`
    );
    // need to show table of products
    connection.query("SELECT * FROM products", function (err, resp) {
        if (err) throw err;
        console.table(resp);
        whatProduct();
    })
}

function whatProduct(){
    // need to show table of products
    connection.query("SELECT product_name FROM products", function (err, resp) {
        if (err) throw err;
        // console.log(resp);
        // prompt will ask what item the user wants to buy
        // will probably want to use lists for this to avoid the user 
        inquirer.prompt([
            {
                type: "list",
                name: "name",
                // choices needs to be the available products
                choices: resp.map(r => r.product_name),
                message: "What would you like to buy?"
            }
        ]).then(function(answer){
            var order = new Order(
                answer.name,
            );
            console.log("You would like " + order.name);
            // once user has selected an item, will trigger how many
            howMany(order.name);
        })
    });

    function howMany(prod){
        connection.query("SELECT * FROM products WHERE product_name = '" + prod + "'", function (err, resp) {
            if (err) throw err;
            console.table(resp);
            // how many the store has should subtrat how many the user buys, if the user buys too many, the transaction should not go through
            connection.end();
        })
    }
    
};
