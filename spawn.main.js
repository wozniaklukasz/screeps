"use strict";

var spawnMain = {
    spawnCreep: function (room, mySpawns, creeps, numberOfCreeps) {
        // todo: refactor if
        if (creeps.filter(function (creep) {
                return creep.memory.role === 'harvester'
            }).length < numberOfCreeps.harvester) {
            this.creepSpawning(mySpawns, 'harvester', room);
        } else if (creeps.filter(function (creep) {
                return creep.memory.role === 'builder'
            }).length < numberOfCreeps.builder) {
            this.creepSpawning(mySpawns, 'builder', room);
        } else if (creeps.filter(function (creep) {
                return creep.memory.role === 'upgrader'
            }).length < numberOfCreeps.upgrader) {
            this.creepSpawning(mySpawns, 'upgrader', room);
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
    creepSpawning: function (mySpawns, role, room) {
        var name = role + Game.time;
        var body = [WORK, WORK, CARRY, MOVE];
        var energy = room.energyCapacityAvailable;

        // todo: calculate energy
        if (energy >= 550) {
            body = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
        }

        //todo mySpawns <- iterate over array, pick first available
        mySpawns[0].spawnCreep(body, name,
            {
                memory: {
                    role: role,
                    firstRoom: room.name,
                    secondRoom: null
                }
            });
    }
};

module.exports = spawnMain;