DROP DATABASE IF EXISTS bamazon_customerDB;

CREATE DATABASE bamazon_customerDB;

USE bamazon_customerDB;

CREATE TABLE products (
	id INTEGER (20) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100),
    department_name VARCHAR (100),
    price INTEGER (255) NOT NULL,
    stock_quantity INTEGER (255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Gamecube","video_games",50,100), ("Game Boy","video_games",20,255), ("Shrek","movies",5,255), ("Shrek 2","movies",1,255),
("Kitchen aid","appliances",255,25),("Destroy this journal","book",100,255),("Apple pie","food",1,255),("Furby","toys",255,15),
("Mogwai","pets",15,200),("Wireframe","blueprints",100,100);