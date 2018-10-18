const roleHarvester = require('role.harvester');

const roleLinkHarvester = {

  run: function (creep) {
    creep.isCreepAbleToWork();

    if (creep.memory.working) {
      // let structure = false;
      // linkSource from utils.link.js
      // todo: refactor link logic here:
      let structure = Game.getObjectById(creep.room.memory.linkSource.id);

      if (structure) {
        if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      } else {
        roleHarvester.run(creep);
      }
    }
    else {
      creep.getEnergy(false, true);
    }
  }
};

module.exports = roleLinkHarvester;
