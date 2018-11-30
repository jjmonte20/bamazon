# bamazon

Welcome to the bamazon storefront page

Product is currently in use for customers,

to use first, you will have to 

'npm install'

since you will need the dependecies for mysql, console.table, and inquirer.

Next you will need to provide user and password information for the server, schema and seed info are provided in the repository

# using the storefront

first use 'node bamazonCustomer.js'

The storefront, once connected will show you a list of items for sale and the ability to choose between them with a list
prompt.

When the item is chosen you will then be prompted on how many of that item you would like to buy, along with the price and
how many of that item is available.

If you attempt to buy more that what is in the inventory, you will not be allowed to and suggested to buy a smaller amount.

If you buy less than what is in the inventory, your transaction will be successful, you will receive a total bill, and the store will close

If you want to buy more simply run 'node bamazonCustomer.js' again and you will be able to shop some more.
Keep in mind though that if you are shopping for the same item, there will be less inventory because of the items you recently purchased

Enjoy!
