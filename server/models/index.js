var mysql = require('mysql');

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '', {host: 'localhost', dialect: 'mysql', define: {timestamps: false}});
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
    }, // a function which produces all the messages
    post: function (body, callback) {
      let msg = {text: body.message};
      ///
      Room.sync()
        .then(function() {
          return Room.create({name: body.roomname}, { fields: ['name'] });
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
              return User.create({name: body.username}, {fields: ['name']});
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
      // .then(function() {
      //   //////////
      //   Message.sync()
      //     .then(function() {
      //       console.log('MSG:', msg);
      //       Message.create(msg, {fields: ['text', 'user', 'room']});
      //       callback(null);
      //     });
      //   ///////
      // })
      // .catch(function(err) {
      //   // db.close();
      //   callback(err);
      // });




      // //check the room
      // db.dbConnection.query('INSERT INTO rooms (name) VALUES (?)', [body.roomname], function(err) {
      //   if (err) { console.log(err); }
      // });

      // //check the user
      // db.dbConnection.query('INSERT INTO users (name) VALUES (?)', [body.username], function(err) {
      //   if (err) { console.log(err); }
      // });

      // db.dbConnection.query('INSERT INTO messages (user, text, room) VALUES ((SELECT id from users where name = ?), ?, (SELECT id from rooms where name = ?))', [body.username, body.message, body.roomname], (err, results) => {
      //   if (err) {
      //     console.log('failed here:', err);
      //     callback(err);
      //   } else {
      //     callback(null);
      //   }
      // });

      // db.dbConnection.query('select * from messages', function(err) {
      //   if (err) { throw err; }
      // });


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

