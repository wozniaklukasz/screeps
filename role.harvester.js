const roleBuilder = require('role.builder');

const roleHarvester = {

  run: function (creep) {
    creep.isCreepAbleToWork();

    if (creep.memory.working) {
      let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => (s.structureType === STRUCTURE_SPAWN
          || s.structureType === STRUCTURE_EXTENSION
          || s.structureType === STRUCTURE_TOWER)
          && s.energy < s.energyCapacity
      });

      if (structure) {
        if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      } else {
        roleBuilder.run(creep);
      }
    }
    else {
      creep.getEnergy(false, true);
    }
  }
};

module.exports = roleHarvester;
