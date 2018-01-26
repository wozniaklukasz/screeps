"use strict";

var roomMain = {
    getRooms: function () {
        var rooms = [];
        for (var room in Game.rooms) {
            rooms.push(Game.rooms[room]);
        }

        return rooms;
    }
};

module.exports = roomMain;