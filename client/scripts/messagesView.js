var MessagesView = {

  $chats: $('#chats'),

  initialize: function(data) {
    var html = '';
    for ( key in data.results ) {

      let username = data.results[key].username;
      let text = data.results[key].text;
      let friends = false;

      if (text !== undefined && text.length > 0) {
        MessagesView.renderMessage({"username": username, "friends": friends, "text": text});
      }
    }
  },

  renderMessage: function(message) {
    if (!message.friends) {
      message.friends = false;
    }
    var temp = _.template("<div class='chat'>" +
  "<div class='username' id=<%-username%> data-friend=<%-friends%> >" + "<%-username%> </div>" +
  "<div class='text'>" + '<%- text %>' + "</div>" +
  '</div>');

    $(temp(message)).appendTo('#chats');
  },

  renderMessageTop: function(message) {
    if (!message.friends) {
      message.friends = false;
    }
    var temp = _.template("<div class='chat'>" +
  "<div class='username' id=<%-username%> data-friend=<%- friends%> >" + "<%-username%> </div>" +
  "<div class='text'>" + '<%- text %>' + "</div>" +
  '</div>');

    $(temp(message)).prependTo('#chats');
  }
};