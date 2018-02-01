const roleBuilder = require('role.builder');

module.exports = {
    run: function(creep) {

        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working === true) {
            if (creep.room.name === creep.memory.homeRoom) {
                // ROLE
                // todo: add role in memory
                // todo: change name from lDH to importer[ROLE]
                roleBuilder.run(creep);
            }
            else {
                let exit = creep.room.findExitTo(creep.memory.homeRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
        else {
            if (creep.room.name === creep.memory.targetRoom) {
                creep.getEnergy(false, true);
            }
            else {
                let exit = creep.room.findExitTo(creep.memory.targetRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};