const creepInstance = require('creep.instance');
module.exports = {
    run: function(creep) {
        creepInstance.showCreepRole(creep);

        if (creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {

            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            creepInstance.getEnergy(creep, true, true);
        }
    }
};