const roleHarvester = require('role.harvester');

module.exports = {
    run: function(creep) {

        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working === true) {

            // ROLE
            // todo: add role in memory
            // todo: change name from lDH to importer[ROLE]
            roleHarvester.run(creep);


        }
        else {
            if (creep.room.name === creep.memory.secondRoom) {
                creep.getEnergy(false, true);
            }
            else {
                let exit = creep.room.findExitTo(creep.memory.secondRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};