var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function(room) {
    if (room === '' || room === undefined) {
      return false;
    }
    for (let i = 0; i < RoomsView.$select[0].length; i++) {
      if (room === RoomsView.$select[0][i].innerText) {
        return false;
      }
    }
    RoomsView.$select.append($('<option>', {
      value: 1,
      text: `${room}`
    }));
    return true;
  },

  addRoomButton: function() {
    RoomsView.$button.on('click', () => {
      Rooms.add();
      var name = prompt('Please enter your room name', '');
      if (name === null || name === '') {
        txt = 'You cancelled the prompt.';
      } else {
        txt = 'cool ' + name;
      }
      RoomsView.renderRoom(name);
    });
  },

  renderRoom: function(str) {
    console.log($('#rooms select').children());
    let room = App.sanitize(str);
    RoomsView.$select.append($('<option>', {
      value: 1,
      text: `${room}`
    }));
  },

  filter: function() {
    RoomsView.$select.change(function(event) {
      App.roomname = $(this).find('option:selected').text();
      if (App.roomname === 'SEE ALL ROOMS') {
        App.fetch();
      } else {
        var filter = function(array, rmName) {
          let filtered = [];
          for (let i = 0; i < array.length; i++) {
            if (array[i].roomname && array[i].roomname === App.roomname) {
              filtered.push(array[i]);
            }
          }
          return filtered;
        };
        $('#chats').html('');
        App.fetch(()=>{}, filter);
      }
    });
  }

};
