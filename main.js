var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    creepMemoryClearing();

    var harvesters = getNumberOfCreeps('harvester');
    var upgraders = getNumberOfCreeps('upgrader');
    var builders = getNumberOfCreeps('builder');

    var numberOfCreeps = {
        harvester: 3,
        upgrader: 2,
        builder: 1
    };

    firstSpawn(numberOfCreeps, harvesters, upgraders, builders);

    spawnBigUpgraders();

    spawningInfo();

    logRoomsAvailableEnergy();
    setCreepRole();
};

function firstSpawn(numberOfCreeps, harvesters, upgraders, builders) {
    if(harvesters.length < numberOfCreeps.harvester) {
        creepSpawning('harvester', false);
    }

    if(upgraders.length < numberOfCreeps.upgrader && harvesters.length) {
        creepSpawning('upgrader', false);
    }

    if(builders.length < numberOfCreeps.builder && harvesters.length && upgraders.length) {
        creepSpawning('builder', false, 'upgrader');
    }
}

function spawnBigUpgraders() {
    for(var name in Game.rooms) {
        if (Game.rooms[name].energyAvailable >= 550) {
            creepSpawning('upgrader', true);
        }
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

function creepSpawning(role, bigCreep, secondRole) {
    var creepParams = bigCreep ? [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE] : [WORK,CARRY,MOVE];
    var newName = bigCreep ? role + 'Big' + Game.time : role + Game.time;
    console.log('Spawning new ' + role + ': ' + newName);
    Game.spawns['Spawn1'].spawnCreep(creepParams, newName,
        {memory: {
            role: role,
            bigCreep: bigCreep,
            secondRole : secondRole
        }});
}

function spawningInfo() {
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
}

function setCreepRole() {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}

function getNumberOfCreeps(role) {
    var count = _.filter(Game.creeps, (creep) => creep.memory.role == role && !creep.memory.bigCreep);
    var countBig = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.bigCreep);
    console.log('[CREEP INFO]   ' + role + 's: small-' + count.length + ' || big-' + countBig.length);

    return count;
}

function logRoomsAvailableEnergy() {
    for(var name in Game.rooms) {
        console.log('[ENERGY INFO]   ' + 'Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
}

/**/

function killAllCreeps() {
    for(var creep in Game.creeps) {
        creep.suicide();
    }
}