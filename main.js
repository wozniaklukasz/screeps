var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    creepMemoryClearing();

    var enableLog = true;

    var harvesters = getNumberOfCreeps('harvester', enableLog);
    var upgraders = getNumberOfCreeps('upgrader', enableLog);
    var builders = getNumberOfCreeps('builder', enableLog);

    var numberOfCreeps = {
        harvester: 5,
        upgrader: 5,
        builder: 1
    };

    spawningInfo();

    spawnCreeps(numberOfCreeps, harvesters, upgraders, builders);

    setCreepRole();

    consoleLog(enableLog);
};

function consoleLog(logEnable) {
    if (logEnable) {
        logRoomsAvailableEnergy();
    }
}

function spawnCreeps(numberOfCreeps, harvesters, upgraders, builders) {
    if(harvesters < numberOfCreeps.harvester) {
        creepSpawning('harvester');
    } else {
        if (upgraders < numberOfCreeps.upgrader) {
            creepSpawning('upgrader');
        }
        if (builders < numberOfCreeps.builder) {
            creepSpawning('builder', 'upgrader');
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

function creepSpawning(role, secondRole) {
    var bigCreep = false;

    for(var name in Game.rooms) {
        bigCreep = Game.rooms[name].energyCapacityAvailable >= 550;
    }

    var creepParams = bigCreep ? [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE] : [WORK,CARRY,MOVE];
    var newName = bigCreep ? role + 'Big' + Game.time : role + Game.time;
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
    // todo: better control change
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
            // roleBuilder.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
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
/**/

function killAllCreeps() {
    for(var creep in Game.creeps) {
        creep.suicide();
    }
}