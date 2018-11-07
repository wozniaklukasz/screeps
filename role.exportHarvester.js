const roleHarvester = require('role.builder');
const flags = require('game.flags');

module.exports = {
  run: function (creep) {
    creep.isCreepAbleToWork();

    const targetFlag = flags.getFlagByName('export' + creep.memory.homeRoom);
    const targetRoom = targetFlag ? targetFlag.roomName : null;

    if (creep.memory.working) {
      if (creep.room.name === targetRoom) {
        roleHarvester.run(creep);
      }
      else {
        creep.moveCreepToExit(targetRoom);
      }
    }
    else {
      if (creep.room.name === targetRoom) {
        creep.getEnergy();
      }
      else {
        creep.moveCreepToExit(targetRoom);
      }
    }
  }
};
