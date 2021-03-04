var Rooms = {


  add: function() {
    var roomname = window.prompt("Please enter the room name");
    RoomsView.renderRoom(roomname);
    // return roomname;

    // alert('CALLED');

  }
};