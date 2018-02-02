const config = require('config');

require('prototype.creep');
require('prototype.room');
require('prototype.spawn');
require('prototype.tower');

module.exports.loop = function () {
    creepMemoryClearing();
    logGlobalInfo();

    for (let creep in Game.creeps) {
        Game.creeps[creep].runRole();
        Game.creeps[creep].showCreepRole();
    }

    for (let room in Game.rooms) {
        Game.rooms[room].buildStructuresOnFlags();
        Game.rooms[room].logPopulation();
    }

    for (let spawn in Game.spawns) {
        Game.spawns[spawn].spawnCreepsIfNecessary();
        Game.spawns[spawn].spawningInfo();
    }

    let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
    for (let tower of towers) {
        tower.defend();
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

function logGlobalInfo() {
    if(config.booleans.enableConsoleLog) {
        let gcl = Game.gcl;
        console.log('[GCL: ' + gcl.level + ' (xp: ' + Number.parseFloat(gcl.progress * 100 / gcl.progressTotal).toPrecision(3) + '%)]')
    }
}
