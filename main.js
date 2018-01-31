var roomMain = require('room.main');
var roomInstance = require('room.instance');
var creepMain = require('creep.main');
var spawnMain = require('spawn.main');

require('prototype.creep');
require('prototype.room');
const config = require('config');

module.exports.loop = function () {
    creepMemoryClearing();
    let rooms = roomMain.getRooms();

    // Creeps
    for (let name in Game.creeps) {
        Game.creeps[name].runRole();
    }

    // Spawn

    // Room
    for (let room in Game.rooms) {
        Game.rooms[room].buildStructuresOnFlags(config.booleans.enableBuildingByFlagsColors);
    }

    rooms.forEach(function (room) {

        let numberOfCreeps = setNumberOfCreepsByRoomName(room.name);

        let creeps = room.find(FIND_MY_CREEPS);
        let mySpawns = room.find(FIND_MY_SPAWNS);

        spawnMain.spawnCreep(room, mySpawns, creeps, numberOfCreeps);



        tower(room);
        if (1) {
            console.log(
                roomInstance.infoLog(room) +
                creepMain.infoLog(creeps, numberOfCreeps)
            );
        }
        spawnMain.spawningInfo(mySpawns);

    });
};

function setNumberOfCreepsByRoomName(roomName) {
    let numberOfCreeps = {
        harvester: 4,
        builder: 3,
        upgrader: 1,
        longDistanceHarvester: 0,
        repairer: 1
    };
    if (roomName === 'E28S28') {
        numberOfCreeps = {
            harvester: 2,
            builder: 1,
            upgrader: 1,
            longDistanceHarvester: 0,
            repairer: 1
        };
    } else if (roomName === 'E29S28') {
        numberOfCreeps = {
            harvester: 2,
            builder: 1,
            upgrader: 1,
            longDistanceHarvester: 0,
            repairer: 1
        };
    }

    return numberOfCreeps;
}

function creepMemoryClearing() {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
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
