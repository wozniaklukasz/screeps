const roleHarvester = require('role.harvester');

const roleLinkHarvester = {

  run: function (creep) {
    creep.isCreepAbleToWork();

    if (creep.room.find(FIND_MY_CREEPS, {
      filter: c => c.memory.role === 'linkUpgrader'
    }).length === 0) {
      // harvest if there isnt upgrader
      roleHarvester.run(creep);
    } else {

      if (creep.memory.working) {
        // let structure = false;
        // linkSource from utils.link.js
        // todo: refactor link logic here:
        let structure = Game.getObjectById(creep.room.memory.linkSourceId);

        if (structure) {
          if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.myMoveTo(structure);
          }
        } else {
          roleHarvester.run(creep);
        }
      }
      else {
        creep.getEnergy(false, true);
      }
    }
  }
};

module.exports = roleLinkHarvester;
