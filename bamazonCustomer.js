var mysql = require("mysql");
var inquirer = require("inquirer");

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
function Order(name, amount){
    this.name = name;
    this.amount = amount;
}

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    connection.end();
});

function promptCustomerQuery() {
    console.log(
`
----------
Welcome to bamazon!
----------
`
    );
    // prompt questions for the user, these should determine what the user wants and how many they want
    inquirer.prompt([{
        name: "name",
        message: "What would you like to buy?"
    },{
        name: "amount",
        message: "How many would you like?"
    }
    ]).then(function(answers){
        // test that the answers are prompted
        var order = new Order(
            answers.name,
            parseInt(answers.amount)
        );
        console.log("Your order is: " + order.amount + " " + order.name);
    })
};

promptCustomerQuery();