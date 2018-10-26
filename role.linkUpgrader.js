const roleHarvester = require('role.harvester');

module.exports = {
  run: function (creep) {
    creep.isCreepAbleToWork();

    if (creep.room.find(FIND_MY_CREEPS, {
      filter: c => c.memory.role === 'linkHarvester'
    }).length === 0) {
      // harvest if there isnt upgrader
      roleHarvester.run(creep);
    } else {

      if (creep.memory.working) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.myMoveTo(creep.room.controller);
        }
      }
      else {
        //todo: change link logic
        let link = Game.getObjectById(creep.room.memory.linkControllerId);
        if (creep.withdraw(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.myMoveTo(link);
        }
      }
    }
  }
};
