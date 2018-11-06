const flags = require('game.flags');
var roleBuilder = require('role.builder');

// REPAIRER -> BUILDER
module.exports = {
  run: function (creep) {
    creep.isCreepAbleToWork();
    const targetFlag = flags.getFlagByName('reserved' + creep.memory.homeRoom);
    const targetRoom = targetFlag ? targetFlag.roomName : null;

    // no flag = harvester
    if (!targetRoom) {
      const homeRoom = creep.memory.homeRoom;
      if (creep.room.name === homeRoom) {
        roleHarvester.run(creep);
      }
      else {
        creep.moveCreepToExit(homeRoom);
      }
    } else {
      if (creep.room.name === targetRoom) {
        if (creep.memory.working) {

          let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL
          });

          if (structure) {
            if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
              creep.myMoveTo(structure);
            }
          }
          else {
            // todo: check if signed room
            creep.myMoveTo(targetFlag);
          }
        }
        else {
          creep.getEnergy(true, true);
        }
      }
      else {
        creep.moveCreepToExit(targetRoom);
      }
    }
  }
};
