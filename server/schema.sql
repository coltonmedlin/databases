CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int(6) NOT NULL auto_increment,
  text varchar(140) NULL DEFAULT NULL,
  user int(6) NULL DEFAULT NULL,
  room int(6) NULL DEFAULT NULL,
  FOREIGN KEY (room) REFERENCES rooms (id),
  FOREIGN KEY (user) REFERENCES users (id),
  PRIMARY KEY(id)
);

CREATE TABLE rooms (
  id int(6) NOT NULL auto_increment,
  name varchar(60) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users(
  id int(6) NOT NULL auto_increment,
  name varchar(60) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

