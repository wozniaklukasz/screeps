var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    creepMemoryClearing();
    
    var spawnName = 'Thor';

    var enableLog = true;

    var harvesters = getNumberOfCreeps('harvester', enableLog);
    var upgraders = getNumberOfCreeps('upgrader', enableLog);
    var builders = getNumberOfCreeps('builder', enableLog);

    var numberOfCreeps = {
        harvester: {
            min: 4,
            max: 4
        },
        upgrader: 1,
        builder: 3
    };

    spawningInfo(spawnName);

    spawnCreeps(spawnName, numberOfCreeps, harvesters, upgraders, builders);

    setCreepRole();
    
    roadMaintance();

    wallMaintance();

    consoleLog(enableLog);
};

function consoleLog(logEnable) {
    if (logEnable) {
        logRoomsAvailableEnergy();
    }
}

function spawnCreeps(spawnName, numberOfCreeps, harvesters, upgraders, builders) {
    if (harvesters < numberOfCreeps.harvester.min) {
        creepSpawning(spawnName, 'harvester');
    } else if (builders < numberOfCreeps.builder) {
        creepSpawning(spawnName, 'builder');
    } else if (upgraders < numberOfCreeps.upgrader) {
        creepSpawning(spawnName, 'upgrader');
    } else if (harvesters < numberOfCreeps.harvester.max) {
        creepSpawning(spawnName, 'harvester');
    }
}

function creepMemoryClearing() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function creepSpawning(spawnName, role) {
    var bigCreep = false;
    var bigBigCreep = false;
    var bigBigBigCreep = false;

    for(var name in Game.rooms) {
        var energyCapacityAvailable = Game.rooms[name].energyCapacityAvailable;
        bigCreep = energyCapacityAvailable >= 550 && energyCapacityAvailable < 800;
        bigBigCreep = energyCapacityAvailable >= 800 && energyCapacityAvailable < 1050;
        bigBigBigCreep = energyCapacityAvailable >= 1050;
    }

    // todo: working on stage 3 (800)
    var creepParams = bigCreep ? [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE] : [WORK,WORK,CARRY,MOVE];
    creepParams = bigBigCreep ? [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE] : creepParams;
    creepParams = bigBigBigCreep ? [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE] : creepParams;
    var newName = bigCreep ? role + 'Big' + Game.time : role + Game.time;
    Game.spawns[spawnName].spawnCreep(creepParams, newName,
        {memory: {
            role: role,
            bigCreep: bigCreep
        }});
}

function spawningInfo(spawnName) {
    if(Game.spawns[spawnName].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1,
            Game.spawns[spawnName].pos.y,
            {align: 'left', opacity: 0.8});
    }
}

function setCreepRole() {
    // todo: better control change
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES).length;

        if(creep.memory.role === 'harvester') {
            // harvester -> builder -> upgrader
            var energyIsFull = creep.room.energyAvailable === creep.room.energyCapacityAvailable;
            // todo: redundand var from harvester role
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;}});
            if (targets.length) {
                roleHarvester.run(creep)
            } else {
                // targets ? roleBuilder.run(creep) : roleUpgrader.run(creep);
                roleUpgrader.run(creep);
            }
        }
        if(creep.memory.role === 'builder') {
            // builder -> upgrader
            targets ? roleBuilder.run(creep) : roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}

function getNumberOfCreeps(role, enableLog) {
    var count = _.filter(Game.creeps, (creep) => creep.memory.role == role && !creep.memory.bigCreep);
    var countBig = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.bigCreep);
    var numOfCreeps = 0;

    if (enableLog) {
        console.log('[CREEP INFO]   ' + role + 's: small-' + count.length + ' || big-' + countBig.length);
    }

    numOfCreeps = countBig ? countBig.length : 0;
    numOfCreeps += count ? count.length : 0;

    return numOfCreeps;
}

function logRoomsAvailableEnergy() {
    for(var name in Game.rooms) {
        console.log('[ENERGY INFO]   ' + 'Room "'+name+'" has '+Game.rooms[name].energyAvailable+'/'+Game.rooms[name].energyCapacityAvailable
            +' energy');
    }
}

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
      {x: 23, y: 29}
    ];

    roadPos.map((pos) => Game.rooms["E32S12"].createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD));
}

function wallMaintance() {
    var wallPos = [
        {x: 35, y: 35},
        {x: 35, y: 34},
        {x: 34, y: 33},
        {x: 33, y: 32},
        {x: 22, y: 23},
        {x: 23, y: 24},
        {x: 24, y: 25},
        {x: 25, y: 26}
    ];

    wallPos.map((pos) => Game.rooms["E32S12"].createConstructionSite(pos.x, pos.y, STRUCTURE_WALL));
}
/**/

function killAllCreeps() {
    for(var creep in Game.creeps) {
        creep.suicide();
    }
}