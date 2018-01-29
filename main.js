var roomMain = require('room.main');
var roomInstance = require('room.instance');
var creepMain = require('creep.main');
var spawnMain = require('spawn.main');

module.exports.loop = function () {
    creepMemoryClearing();
    let rooms = roomMain.getRooms();

    rooms.forEach(function (room) {

        let numberOfCreeps = setNumberOfCreepsByRoomName(room.name);

        let creeps = room.find(FIND_MY_CREEPS);
        let mySpawns = room.find(FIND_MY_SPAWNS);

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

        buildStructuresOnFlags(room);
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
            harvester: 3,
            builder: 2,
            upgrader: 1,
            longDistanceHarvester: 4,
            repairer: 1
        };
    } else if (roomName === 'E29S28') {
        numberOfCreeps = {
            harvester: 4,
            builder: 4,
            upgrader: 1,
            longDistanceHarvester: 0,
            repairer: 1
        };
    }

    return numberOfCreeps;
}

function creepMemoryClearing() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function buildStructuresOnFlags(room) {
    if(room.controller.level !== 5) {
        return;
    }

    /*
    * Build structures by flag colors.
    * */
    room.find(FIND_FLAGS).map(f => {
        let structure = '';

        if (f.color === 10) {
            structure = STRUCTURE_ROAD // white flag
        } else if (f.color === 6) {
            structure = STRUCTURE_EXTENSION // yellow flag
        } else if (f.color === 1) {
            structure = STRUCTURE_TOWER // red flag
        }

        buildStructure(f.pos.roomName, f.pos.x, f.pos.y, structure)
    })

}

function buildStructure(roomName, x, y, structure) {
    Game.rooms[roomName].createConstructionSite(x, y, structure);
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
