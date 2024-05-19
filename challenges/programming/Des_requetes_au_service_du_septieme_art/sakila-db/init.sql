-- Create the Sakila database and load the schema
CREATE DATABASE sakila;
USE sakila;

-- Load the Sakila schema and data
SOURCE sakila-schema.sql;
SOURCE sakila-data.sql;

-- Create a read-only user
CREATE USER 'user'@'%' IDENTIFIED BY 'user';
GRANT SELECT ON sakila.* TO 'user'@'%';
FLUSH PRIVILEGES;