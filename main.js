require('prototype.creep');
require('prototype.room');
require('prototype.spawn');
const config = require('config');

module.exports.loop = function () {
    creepMemoryClearing();

    for (let creep in Game.creeps) {
        Game.creeps[creep].runRole();
        Game.creeps[creep].showCreepRole();
    }

    for (let room in Game.rooms) {
        Game.rooms[room].buildStructuresOnFlags(config.booleans.enableBuildingByFlagsColors);
        Game.rooms[room].logPopulation();

        //todo:
        tower(Game.rooms[room]);
    }

    for (let spawn in Game.spawns) {
        Game.spawns[spawn].spawnCreepsIfNecessary();
        Game.spawns[spawn].spawningInfo();
    }
};

function creepMemoryClearing() {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

// todo: tower.prototype
function tower(room) {
    let tower = room.find(FIND_STRUCTURES).filter(function (s) {
        return s.structureType === STRUCTURE_TOWER;
    });

    tower.map(t => {
        let target = t.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            t.attack(target);
        }
    });
}
