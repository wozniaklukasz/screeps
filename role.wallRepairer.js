const roleBuilder = require('role.builder');

const HIT_WALL_TO_REPAIR = 1000001;
module.exports = {
    run: function(creep) {
        creep.isCreepAbleToWork();

        // TODO: !
        if (creep.memory.working) {
            let walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_WALL && s.hits < HIT_WALL_TO_REPAIR
            });

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