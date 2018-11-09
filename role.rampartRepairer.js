const roleHarvester = require('role.harvester');

module.exports = {
  run: function (creep) {
    creep.isCreepAbleToWork();

    if (creep.memory.working) {

      const rampartToBuild = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
        filter: (s) => s.structureType === STRUCTURE_RAMPART
      });

      // build ramparts and fulfill towers if their repairs ramparts
      if (rampartToBuild) {
        creep.buildConstruction(rampartToBuild);
      } else {
        const tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: (s) => (s.structureType === STRUCTURE_TOWER)
            && s.energy < s.energyCapacity
        });

        if (tower) {
          if (creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.myMoveTo(tower);
          }
        } else {
          roleHarvester.run(creep);
        }
      }
    }
    else {
      creep.getEnergy(true, true);
    }
  }
};
