var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    // port
    port: 3306,

    // password
    password: "EpicGis20",
    // database: "bamazon_customerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId)
    connection.end();
})