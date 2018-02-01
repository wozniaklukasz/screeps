const roleBuilder = require('role.builder');

module.exports = {
    run: function(creep) {
        creep.isCreepAbleToWork();

        if (creep.memory.working) {
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