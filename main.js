var roomMain = require('room.main');
var roomInstance = require('room.instance');
var creepMain = require('creep.main');
var spawnMain = require('spawn.main');

module.exports.loop = function () {
    creepMemoryClearing();

    var numberOfCreeps = {
        harvester: 3,
        builder: 2,
        upgrader: 1,
        longDistanceHarvester: 4,
        repairer: 1
    };
    var rooms = roomMain.getRooms();

    rooms.forEach(function (room) {
        var creeps = room.find(FIND_MY_CREEPS);
        var mySpawns = room.find(FIND_MY_SPAWNS);

        spawnMain.spawnCreep(room, mySpawns, creeps, numberOfCreeps);
        creepMain.setCreepsRole(room, creeps);

        if (1) {
            console.log(
                roomInstance.infoLog(room) +
                creepMain.infoLog(creeps, numberOfCreeps)
            );
        }
        spawnMain.spawningInfo(mySpawns);
    });

    // extensionMaintance();
};


function creepMemoryClearing() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function extensionMaintance() {
    var pos = [
        {x: 13, y: 30},
        {x: 14, y: 29},
        {x: 15, y: 28},
        {x: 16, y: 27},
        {x: 17, y: 26},
        {x: 13, y: 29},
        {x: 14, y: 28},
        {x: 15, y: 27},
        {x: 16, y: 26},
        {x: 17, y: 25}
    ];
    pos.map((pos) => Game.rooms["E28S28"].createConstructionSite(pos.x, pos.y, STRUCTURE_EXTENSION));
}
