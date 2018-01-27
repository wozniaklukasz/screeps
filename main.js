var roomMain = require('room.main');
var roomInstance = require('room.instance');
var creepMain = require('creep.main');
var spawnMain = require('spawn.main');

module.exports.loop = function () {
    creepMemoryClearing();

    var numberOfCreeps = {
        harvester: 5,
        builder: 6,
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


    roadMaintance();

    // wallMaintance();

    extensionMaintance();
};


function creepMemoryClearing() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function roadMaintance() {
    var x = Game.rooms["E28S28"].find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    }).length;
    if (x >= 10) {
        var roadPos = [
            {x: 8, y: 36},
            {x: 9, y: 35},
            {x: 10, y: 34},
            {x: 11, y: 33},
            {x: 12, y: 32},
            {x: 12, y: 31},
            {x: 12, y: 30},
            {x: 12, y: 29},
            {x: 12, y: 28},
            {x: 12, y: 27},
            {x: 12, y: 26},
            {x: 12, y: 25},
            {x: 12, y: 24},
            {x: 13, y: 23},
            {x: 14, y: 22},
            {x: 15, y: 21},
            {x: 16, y: 21},
            {x: 17, y: 21},
            {x: 18, y: 20},
            {x: 18, y: 19},
            {x: 18, y: 18},
            {x: 18, y: 17},
            {x: 18, y: 16},
            {x: 18, y: 15},
            {x: 18, y: 14},
            {x: 18, y: 13},
            {x: 18, y: 12},
            {x: 18, y: 11},
            {x: 18, y: 10},
            {x: 18, y: 9},
            {x: 19, y: 13},
            {x: 20, y: 14},
            {x: 21, y: 15},
            {x: 22, y: 16},
            {x: 23, y: 17},
            {x: 24, y: 18},
            {x: 25, y: 19},
            {x: 26, y: 20}

        ];

        roadPos.map((pos) => Game.rooms["E28S28"].createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD));
    }

}

function extensionMaintance() {
    var pos = [
        {x: 13, y: 24},
        {x: 12, y: 23},
        {x: 13, y: 22},
        {x: 14, y: 21},
        {x: 12, y: 22},
        {x: 13, y: 21}
    ];
    pos.map((pos) => Game.rooms["E28S28"].createConstructionSite(pos.x, pos.y, STRUCTURE_EXTENSION));
}

/**/

