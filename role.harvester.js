const roleBuilder = require('role.builder');

const roleHarvester = {
//todo: pick energy from tombs and resoruces
  run: function (creep) {
    creep.isCreepAbleToWork();

    if (creep.memory.working) {
      const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => (s.structureType === STRUCTURE_SPAWN
          || s.structureType === STRUCTURE_EXTENSION
          || s.structureType === STRUCTURE_TOWER)
          && s.energy < s.energyCapacity
      });

      if (structure) {
        if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.myMoveTo(structure);
        }
      } else {
        const storage = creep.room.storage;
        const constructions = creep.room.find(FIND_CONSTRUCTION_SITES);

        // todo: storage.store[RESOURCE_ENERGY] only counts energy (not minerals)
        // todo: storage.storeCapacity is 1M, now condition is set to 200k
        if (!constructions.length && storage && storage.store[RESOURCE_ENERGY] < 500000) {
          if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.myMoveTo(storage);
          }
        }
        else {
          roleBuilder.run(creep);
        }
      }
    }
    else {
      creep.getEnergy(false, true);
    }
  }
};

module.exports = roleHarvester;
