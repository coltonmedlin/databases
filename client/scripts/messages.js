var Messages = {

  $button: $('#refreshMessages'),

  init: function() {
    Messages.$button.on('click', Messages.refresh);
  },


  render: _.template("<div class='chat'>" +
      "<div class='username'>" + "<%-username%> </div>" +
      "<div class='text'>" + '<%- text %>' + "</div>" +
      '</div>'),

  refresh: function() {
    $("#chats").empty();
    Parse.readAll((data) => {
      Messages.renderMessages(data);
    });
  },

  renderMessages: function(data) {
    var room = RoomsView.$select.val(); //
    var html = '';
    for ( key in data.results ) {
      let friendsList = App.friendsList;
      let username = data.results[key].username;
      let text = data.results[key].text;
      let roomname = data.results[key].roomname;
      let friends = false;

      if (friendsList[username]) {
        friends = true;
      }

      if (text !== undefined && text.length > 0) {
        if (room === 'ALL') {
          MessagesView.renderMessage({"username": username, "friends": friends, "text": text});
        } else if (roomname === room) {
          MessagesView.renderMessage({"username": username, "friends": friends, "text": text});
        }
      }
    }
  }

};



