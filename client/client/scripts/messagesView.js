var MessagesView = {

  $chats: $('#chats'),

  lastAddedMessage: undefined,

  initialize: function() {
    setInterval(() => {
      App.fetch(()=>{}, MessagesView.filterNew);
    }, 1000);
  },

  render: function(arr) {
    var html = '';
    arr.forEach(message => {
      if (message.text && message.username) {
        message.text = App.sanitize(message.text);
        message.username = App.sanitize(message.username);
        message.roomname = App.sanitize(message.roomname);
        RoomsView.initialize(message.roomname);
        html += MessageView.render(message);
      }
    });
    $('#chats').prepend(html);
  },

  renderMessage: function(obj) {
    let message = obj;
    var html = '';
    if (message.text && message.username) {
      message.text = App.sanitize(message.text);
      message.username = App.sanitize(message.username);
      message.roomname = App.sanitize(message.roomname);
      RoomsView.initialize(message.roomname);
      html += MessageView.render(message);
    }
    $('#chats').prepend(html);
  },

  filterNew: function(array) {
    let filtered = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === App.lastAddedMessage) {
        break;
      }
      filtered.push(array[i]);
    }
    return filtered;
  }

};