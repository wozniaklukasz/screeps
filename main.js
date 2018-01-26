var roomMain = require('room.main');
var roomInstance = require('room.instance');
var creepMain = require('creep.main');
var spawnMain = require('spawn.main');

module.exports.loop = function () {
    creepMemoryClearing();

    var numberOfCreeps = {
        harvester: 5,
        builder: 5,
        upgrader: 1
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
                creepMain.infoLog(creeps)
            );
        }
        spawnMain.spawningInfo(mySpawns);
    });


    /**/


    // roadMaintance();

    // wallMaintance();

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

// todo: working on stage 3 (800)
// var creepParams = bigCreep ? [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE] : [WORK, WORK, CARRY, MOVE];
// creepParams = bigBigCreep ? [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] : creepParams;
// creepParams = bigBigBigCreep ? [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] : creepParams;
// creepParams = bigBigBigBigCreep ? [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] : creepParams;


function roadMaintance() {
    var roadPos = [
        {x: 13, y: 24},
        {x: 14, y: 24},
        {x: 15, y: 24},
        {x: 16, y: 24},
        {x: 17, y: 24},
        {x: 18, y: 24},
        {x: 19, y: 24},
        {x: 13, y: 25},
        {x: 14, y: 25},
        {x: 15, y: 25},
        {x: 16, y: 25},
        {x: 17, y: 25},
        {x: 18, y: 25},
        {x: 19, y: 25},
        {x: 13, y: 22},
        {x: 14, y: 22},
        {x: 15, y: 22},
        {x: 13, y: 23},
        {x: 14, y: 23},
        {x: 15, y: 23},
        {x: 13, y: 21},
        {x: 20, y: 25},
        {x: 21, y: 26},
        {x: 22, y: 27},
        {x: 23, y: 28},
        {x: 24, y: 29},
        {x: 24, y: 30},
        {x: 25, y: 31},
        {x: 25, y: 32},
        {x: 26, y: 32},
        {x: 27, y: 32},
        {x: 28, y: 32},
        {x: 29, y: 32},
        {x: 30, y: 32},
        {x: 26, y: 33},
        {x: 27, y: 33},
        {x: 28, y: 33},
        {x: 29, y: 33},
        {x: 30, y: 33},
        {x: 31, y: 33},
        {x: 32, y: 33},
        {x: 25, y: 30},
        {x: 20, y: 26},
        {x: 21, y: 27},
        {x: 22, y: 28},
        {x: 23, y: 29},
        {x: 24, y: 31}
    ];

    // roadPos.map((pos) = > Game.rooms["E32S12"].createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD));
}

function wallMaintance() {
    var wallPos = [
        {x: 35, y: 35},
        {x: 35, y: 34},
        {x: 34, y: 33},
        {x: 33, y: 32},
        {x: 33, y: 33},
        {x: 34, y: 34},
        {x: 22, y: 23},
        {x: 23, y: 24},
        {x: 24, y: 25},
        {x: 25, y: 26},
        {x: 21, y: 23},
        {x: 22, y: 24},
        {x: 23, y: 25},
        {x: 24, y: 26},
        {x: 25, y: 27}
    ];

    // wallPos.map((pos) = > Game.rooms["E32S12"].createConstructionSite(pos.x, pos.y, STRUCTURE_WALL));
}

function extensionMaintance() {


}

/**/

