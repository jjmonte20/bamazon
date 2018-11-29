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
            // console.log(resp[0].stock_quantity);
            console.table(resp);
            inquirer.prompt([
                {
                    type: "input",
                    name: "amount",
                    message: "How many would you like to buy?"
                }
            ]).then(function(answer){
                // the function here should first determine here if there is enough inventory to buy the item
                var newAmount = resp[0].stock_quantity - parseInt(answer.amount);
                console.log(prod);
                // if the user tries to buy too many, the console should have a no prompt and then re ask the question
                if (newAmount < 0) {
                    console.log("We do not have enough of that item, please select a lower amount");
                    howMany(prod);
                } else {
                    // in any other case, the user should purchase the item and then give them a total
                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            // want stock quantity to be the original amount minus the amount purchased
                            stock_quantity:  newAmount
                        },
                        {
                            product_name: prod
                        }
                    ], function(err, res) {
                        if (err) throw err;
                        console.log(res);
                    })
                    // total should be price multiplied by amount that was determined by the answer in the inquirer
                }
            })
            
        })
    }
    
};
