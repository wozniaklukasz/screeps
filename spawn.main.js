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
        } else if (creeps.filter(function (creep) {
                return creep.memory.role === 'repairer'
            }).length < numberOfCreeps.repairer) {
            this.creepSpawning(mySpawns, 'repairer', room);
        } else if (creeps.filter(function (creep) {
                return creep.memory.role === 'longDistanceHarvester'
            }).length < numberOfCreeps.longDistanceHarvester) {
            this.creepSpawning(mySpawns, 'longDistanceHarvester', room);
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
        if (energy >= 800) {
            body = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        }
        if (energy >= 1300) {
            body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
        if (energy >= 1800) {
            body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        }

        // todo: spawn harvester if harvesters===0) - first do calculate energy
        // if() ...

        //todo mySpawns <- iterate over array, pick first available
        if (mySpawns.length) {
            mySpawns[0].spawnCreep(body, name,
                {
                    memory: {
                        role: role,
                        homeRoom: room.name,
                        secondRoom: "E29S28",
                        targetRoom: "E29S28",
                        working: false
                    }
                });
        }

    }
};

module.exports = spawnMain;