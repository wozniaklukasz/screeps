"use strict";

var roomInstance = require('room.instance');

var roomMain = {
    getRooms: function () {
        var rooms = [];
        for (var name in Game.rooms) {
            rooms.push(roomInstance.get(name));
        }

        return rooms;
    }
};

module.exports = roomMain;