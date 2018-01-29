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

        tower(room);
        if (1) {
            console.log(
                roomInstance.infoLog(room) +
                creepMain.infoLog(creeps, numberOfCreeps)
            );
        }
        spawnMain.spawningInfo(mySpawns);

        // buildStructuresOnFlags(room);
    });
};


function creepMemoryClearing() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function buildStructuresOnFlags(room) {
    room.find(FIND_FLAGS).map(f => {
        Game.rooms[f.pos.roomName].createConstructionSite(f.pos.x, f.pos.y, STRUCTURE_EXTENSION)
    })

}

function tower(room) {
    let tower = room.find(FIND_STRUCTURES).filter(function(s) {
        return s.structureType === STRUCTURE_TOWER;
    });

    tower.map(t => {
        let target = t.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            t.attack(target);
        }
    });
}
