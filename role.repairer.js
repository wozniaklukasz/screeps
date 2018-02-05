var roleBuilder = require('role.builder');

// REPAIRER -> BUILDER
module.exports = {
    run: function(creep) {
        creep.isCreepAbleToWork();

        if (creep.memory.working) {
            // add if necessary && s.structureType !== STRUCTURE_RAMPART
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
            creep.getEnergy(true, true);
        }
    }
};