"use strict";

var roomInstance = {
    infoLog: function (room) {
        return '[Room ' + room.name + ': (energy: ' + room.energyAvailable + '/' + room.energyCapacityAvailable + ')]';
    }
};

module.exports = roomInstance;