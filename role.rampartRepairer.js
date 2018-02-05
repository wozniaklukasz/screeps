// todo: conception with wall builder

const roleBuilder = require('role.builder');

module.exports = {
    run: function(creep) {
        creep.isCreepAbleToWork();

        if (creep.memory.working) {
            // care with this constants (CPU limit)
            const WALL_MAX_HITPOINTS = 10000000;
            const hitpointsIncrementation = 1000000;
            let walls = [];
            let hitsWallToRepair = 0;

            while (!walls.length && hitsWallToRepair < WALL_MAX_HITPOINTS) {
                hitsWallToRepair += hitpointsIncrementation;
                walls = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_RAMPART && s.hits < hitsWallToRepair
                });
            }

            if (walls) {
                let wall = creep.pos.findClosestByRange(walls);

                if (creep.repair(wall) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(wall);
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