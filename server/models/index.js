var mysql = require('mysql');

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '', {host: 'localhost', dialect: 'mysql', define: {timestamps: false}});
// const sequelize = new Sequelize(config.url, config);
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
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
      // console.log('models.messages.get');

      // db.dbConnection.query('SELECT messages.id, messages.text, rooms.name as ?, users.name as ? FROM messages INNER JOIN rooms ON messages.room = rooms.id INNER JOIN users ON messages.user = users.id', ['room', 'username'], (err, results) => {
      //   if (err) {
      //     callback(err, null);
      //   } else {
      //     console.log('message:', results);
      //     callback(null, results);
      //   }
      // });

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

      // Message.sync()
      //   .then(function() {
      //     return Message.findAll();
      //   })
      //   .then(function(messages) {
      //     messages.forEach(message => {
      //       message = message.dataValues;
      //       console.log('MESSAGE:', message);
      //       Rooms.sync()
      //         .then(function() {
      //           return Room.findAll({where: {id: message.room}});
      //         })
      //         .catch(function(err) {
      //           console.log(err);
      //           callback(err);
      //         })
      //         .then(function(room) {
      //           console.log('ROOM:', room);
      //           message.room = room[0].dataValues.name;
      //           return;
      //         })
      //         .then(function() {
      //           Users.sync()
      //             .then(function() {
      //               return User.findAll({where: {id: message.id}});
      //             })
      //             .then(function(user) {
      //               message.user = user[0].dataValues.name;
      //             });
      //         });
      //     });
      //   })
      //   .catch(function(err) {
      //     callback(err);
      //   });
    }, // a function which produces all the messages
    post: function (body, callback) {
      let msg = {text: body.message};
      ///
      Room.sync()
        .then(function() {
          // return Room.create({name: body.roomname}, { fields: ['name'] });
          return db.query(`INSERT IGNORE into rooms (name) VALUES ('${body.roomname}')`);
        })
        .then(function() {
          return Room.findAll({ where: {name: body.roomname} });
        })
        .then(function(room) {
          //assign roomID
          msg.room = room[0].dataValues.id;
          console.log('room', msg.room);
          return;
        })
        .then(function() {
          /////////
          User.sync()
            .then(function() {
              // return User.create({name: body.username}, {fields: ['name']});
              return db.query(`INSERT IGNORE into users (name) VALUES ('${body.username}')`);
            })
            .then(function() {
              return User.findAll({ where: {name: body.username}});
            })
            .then(function(user) {
              // assign userID
              msg.user = user[0].dataValues.id;
              console.log('USER ID', msg.user);
              return;
            }) ///// new junction here << ------
            .then(function() {
              //////////
              Message.sync()
                .then(function() {
                  console.log('MSG:', msg);
                  Message.create(msg, {fields: ['text', 'user', 'room']});
                  callback(null);
                });
              ///////
            })
            .catch(function(err) {
              // db.close();
              callback(err);
            });
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {

    },
    post: function (username, callback) {
      User.sync()
        .then(function() {
          return User.create({name: username});
        })
        .then(function() {
          //db.close();
          callback(null);
        })
        .catch(function(err) {
          // db.close();
          callback(err);
        });
      // db.close();
    }
  }
};

