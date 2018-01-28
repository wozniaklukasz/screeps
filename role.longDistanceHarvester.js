const creepInstance = require('creep.instance');
const roleBuilder = require('role.builder');

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
            if (creep.room.name === creep.memory.secondRoom) {
                creepInstance.getEnergy(creep, false, true);
            }
            else {
                let exit = creep.room.findExitTo(creep.memory.secondRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};