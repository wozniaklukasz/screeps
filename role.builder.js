/*
Builder doesn't build walls and ramparts.
*/

const roleUpgrader = require('role.upgrader');

module.exports = {
  run: function (creep) {
    creep.isCreepAbleToWork();

    if (creep.memory.working) {

      const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
        filter: (s) => s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
      });

      if (constructionSite) {
        creep.buildConstruction(constructionSite);
      }
      else {
        roleUpgrader.run(creep);
      }
    }
    else {
      creep.getEnergy(true, true);
    }
  }
};
