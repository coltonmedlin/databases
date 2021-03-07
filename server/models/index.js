var mysql = require('mysql');

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '', {host: 'localhost', dialect: 'mysql', define: {timestamps: false}});

var User = db.define('users', {
  name: Sequelize.STRING
});

var Message = db.define('messages', {
  user: Sequelize.INTEGER,
  text: Sequelize.STRING,
  room: Sequelize.INTEGER
});

var Room = db.define('rooms', {
  name: Sequelize.STRING
});

///////////////////


module.exports = {
  messages: {
    get: function (callback) {
      Message.sync()
        .then(function() {
          return db.query('SELECT messages.id, messages.text, rooms.name as \'room\', users.name as \'username\' FROM messages INNER JOIN rooms ON messages.room = rooms.id INNER JOIN users ON messages.user = users.id');
        })
        .then(function(msgs) {
          console.log('MESSAGES', msgs);
          callback(null, msgs[0]);
        })
        .catch((err) => {
          callback(err);
        });
    }, // a function which produces all the messages
    post: function (body, callback) {
      let msg = {text: body.message};
      Room.sync()
        .then(function() {
          return db.query(`INSERT IGNORE into rooms (name) VALUES ('${body.roomname}')`);
        })
        .then(function() {
          return Room.findAll({ where: {name: body.roomname} });
        })
        .then(function(room) {
          msg.room = room[0].dataValues.id;
          console.log('room', msg.room);
          return;
        })
        .then(function() {
          User.sync()
            .then(function() {
              return db.query(`INSERT IGNORE into users (name) VALUES ('${body.username}')`);
            })
            .then(function() {
              return User.findAll({ where: {name: body.username}});
            })
            .then(function(user) {
              msg.user = user[0].dataValues.id;
              console.log('USER ID', msg.user);
              return;
            })
            .then(function() {
              Message.sync()
                .then(function() {
                  console.log('MSG:', msg);
                  Message.create(msg, {fields: ['text', 'user', 'room']});
                  callback(null);
                });
            })
            .catch(function(err) {
              callback(err);
            });
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function () {

    },
    post: function (username, callback) {
      User.sync()
        .then(function() {
          return User.create({name: username});
        })
        .then(function() {
          callback(null);
        })
        .catch(function(err) {
          callback(err);
        });
    }
  }
};

