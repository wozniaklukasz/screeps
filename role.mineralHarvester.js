const roleHarvester = require('role.harvester');

const roleMineralHarvester = {
    run: function (creep) {
        creep.isCreepAbleToWork();

        if (creep.memory.working) {
            roleHarvester.run(creep);

            // let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            //     filter: (s) => (s.structureType === STRUCTURE_LAB && s.mineralAmount < s.mineralCapacity)});
            //
            // let labs = creep.room.find(FIND_MY_STRUCTURES, {
            //     filter: (s) => (s.structureType === STRUCTURE_LAB)});
            // let lab = labs[0];
            //
            // if (structure) {
            //     if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            //         creep.moveTo(structure);
            //     }
            // } else {
            //     roleHarvester.run(creep);
            // }

        }
        else {
            // let minerals = creep.pos.findClosestByPath(creep.room.find(FIND_MINERALS));
            //
            // if (creep.harvest(minerals) === ERR_NOT_IN_RANGE) {
            //     creep.moveTo(minerals);
            // }
            creep.getEnergy(false, true);
        }
    }
};

module.exports = roleMineralHarvester;