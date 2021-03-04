var RoomsView = {

  $button: $('#addroom'),
  $select: $('#controls select'),

  initialize: function() {
    RoomsView.$button.on('click', Rooms.add);

    RoomsView.$select.on('change', Messages.refresh);

    Parse.readAll( (data) => {
      RoomsView.populateRoomsList(data);
    });
  },


  populateRoomsList: function(data) {
    var html = '';
    var rooms = [];
    for ( key in data.results ) {
      let roomname = data.results[key].roomname;
      if (roomname) {
        if (!rooms.includes(roomname)) {
          rooms.push(roomname);
        }
      }
    }
    var html = '';
    for (var i = 0; i < rooms.length; i++) {
      html += RoomsView.roomTemplate({"room": rooms[i]});
    }
    RoomsView.$select.append(html);
  },

  roomTemplate: _.template("<option value= <%-room%> > <%-room%> </option>"),



  renderRoom: function(roomname) {
    // add roomname to select

    var html = RoomsView.roomTemplate({"room": roomname});
    RoomsView.$select.append(html);



    //alert(roomname);
  }




};
