const roleBuilder = require('role.builder');
const config = require('config');

const roleHarvester = {
//todo: pick energy from tombs and resoruces
  run: function (creep) {
    creep.isCreepAbleToWork();

    // todo: if many extensions low energy - exclude towers
    if (creep.memory.working) {
      const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => (s.structureType === STRUCTURE_SPAWN
          || s.structureType === STRUCTURE_EXTENSION)
          && s.energy < s.energyCapacity
      });

      if (structure) {
        if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.myMoveTo(structure);
        }
      } else {
        const tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: (s) => (s.structureType === STRUCTURE_TOWER && s.energy < s.energyCapacity)
        });

        if (tower) {
          if (creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.myMoveTo(tower);
          }
        } else {
          const nuker = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType === STRUCTURE_NUKER && s.energy < s.energyCapacity)
          });

          if (nuker) {
            if (creep.transfer(nuker, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.myMoveTo(nuker);
            }
          } else {
            const storage = creep.room.storage;
            const constructions = creep.room.find(FIND_CONSTRUCTION_SITES);

            if (!constructions.length && storage && storage.store[RESOURCE_ENERGY] < config.constans.STORAGE_ENERGY) {
              if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.myMoveTo(storage);
              }
            }
            else {
              roleBuilder.run(creep);
            }
          }
        }
      }
    }
    else {
      creep.getEnergy(false, true);
    }
  }
};

module.exports = roleHarvester;
