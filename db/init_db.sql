DROP DATABASE IF EXISTS mydb;

CREATE DATABASE mydb;

USE mydb;

DROP TABLE IF EXISTS Product;

CREATE TABLE Product (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(100),
  image VARCHAR(100),
  price DECIMAL(10,2),
  PRIMARY KEY (id),
  UNIQUE (name)
);

INSERT INTO Product (name) VALUES('water');