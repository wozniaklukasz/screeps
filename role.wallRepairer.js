const roleBuilder = require('role.builder');

module.exports = {
    run: function(creep) {
        creep.isCreepAbleToWork();

        // TODO: !
        if (creep.memory.working) {
            let wall = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_WALL
            });

            if (wall[0]) {
                if (creep.repair(wall[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(wall[0]);
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