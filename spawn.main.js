"use strict";

var spawnMain = {
    spawnCreep: function (room, mySpawns, creeps, numberOfCreeps) {
        // todo: refactor if
        if (creeps.filter(function (creep) {
                return creep.memory.role === 'harvester'
            }).length < numberOfCreeps.harvester) {
            this.creepSpawning(mySpawns, 'harvester', room.name);
        } else if (creeps.filter(function (creep) {
                return creep.memory.role === 'builder'
            }).length < numberOfCreeps.builder) {
            this.creepSpawning(mySpawns, 'builder', room.name);
        } else if (creeps.filter(function (creep) {
                return creep.memory.role === 'upgrader'
            }).length < numberOfCreeps.upgrader) {
            this.creepSpawning(mySpawns, 'upgrader', room.name);
        }
    },
    spawningInfo: function (mySpawns) {
        mySpawns.forEach(function (spawn) {
            if (spawn.spawning) {
                var spawningCreep = Game.creeps[spawn.spawning.name];
                spawn.room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    spawn.pos.x + 1,
                    spawn.pos.y,
                    {align: 'left', opacity: 0.8});
            }
        });
    },
    creepSpawning: function (mySpawns, role, roomName) {
        var name = role + Game.time;
        var body = [WORK, WORK, CARRY, MOVE];
        //todo mySpawns <- iterate over array, pick first available
        mySpawns[0].spawnCreep(body, name,
            {
                memory: {
                    role: role,
                    firstRoom: roomName,
                    secondRoom: null
                }
            });
    }
};

module.exports = spawnMain;