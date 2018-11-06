const gameRooms = {
  _rooms: {},

  setRooms: function () {
    this._rooms = {};
    const gRooms = Game.rooms;

    for (let room in gRooms) {
      this._rooms[gRooms[room].name] = gRooms[room];
    }
  },

  getRoomByName: function (name) {
    for (let room in this._rooms) {
      if (room.toString().toLowerCase() === name.toLowerCase()) {
        return this._rooms[room];
      }
    }
    return null;
  },

  getRooms() {
    return this._rooms;
  }
};

module.exports = gameRooms;
