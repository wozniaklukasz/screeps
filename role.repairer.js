var roleBuilder = require('role.builder');
const creepInstance = require('creep.instance');

// todo: find the most damaged structure to repair
// REPAIRER -> BUILDER
module.exports = {
    run: function(creep) {
        creepInstance.showCreepRole(creep);

        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working === true) {
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL
            });

            if (structure) {
                if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                roleBuilder.run(creep);
            }
        }
        else {
            creepInstance.getEnergy(creep, true, true);
        }
    }
};