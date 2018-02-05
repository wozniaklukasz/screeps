const roleBuilder = require('role.builder');
const roleHarvester = require('role.harvester');

// todo: rename to importer/exporter
// todo: add run by secondRole OR extend run method (import/export as second role)!
module.exports = {
    run: function(creep) {
        creep.isCreepAbleToWork();

        if (creep.memory.working) {
            if (creep.room.name === creep.memory.homeRoom) {
                // ROLE
                // todo: add role in memory
                // todo: change name from lDH to importer[ROLE]
                roleBuilder.run(creep);
                // roleHarvester.run(creep);
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