"use strict";

var roomInstance = {
    get: function (roomId) {
        var room = Game.rooms[roomId];

        var myStructuresTmp = room.find(FIND_MY_STRUCTURES);
        var structuresTmp = room.find(FIND_STRUCTURES);

        var myStructures = {
            spawns: myStructuresTmp.filter(function (structure) {
                return structure.structureType === STRUCTURE_SPAWN
            }),
            extensions: myStructuresTmp.filter(function (structure) {
                return structure.structureType === STRUCTURE_EXTENSION
            }),
            towers: myStructuresTmp.filter(function (structure) {
                return structure.structureType === STRUCTURE_TOWER
            })
        };

        var structures = {
            walls: structuresTmp.filter(function (structure) {
                return structure.structureType === STRUCTURE_WALL
            }),
            roads: structuresTmp.filter(function (structure) {
                return structure.structureType === STRUCTURE_ROAD
            })
        };

        return {
            roomId: roomId,
            constructions: room.find(FIND_CONSTRUCTION_SITES),
            myStructures: myStructures,
            structures: structures,
            myCreeps: room.find(FIND_MY_CREEPS),
            sources: room.find(FIND_SOURCES),
            energyAvailable: room.energyAvailable,
            energyCapacityAvailable: room.energyCapacityAvailable
        };
    },
    infoLog: function (room) {
        return '[Room ' + room.roomId + ': (energy: ' + room.energyAvailable + '/' + room.energyCapacityAvailable + ')]';
    }
};

module.exports = roomInstance;