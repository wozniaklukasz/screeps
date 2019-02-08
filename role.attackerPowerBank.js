const flags = require('game.flags');

module.exports = {
  run: function (creep) {
    const targetFlag = flags.getFlagByName('powerbank');
    const targetRoom = targetFlag ? targetFlag.roomName : null;

    // todo: works but modify body (move/attack/heal)
    const targetStructures = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => s.structureType === STRUCTURE_POWER_BANK
    });

    if (targetStructures) {
      if (creep.hits < (creep.hitsMax / 2)) {
        creep.heal(creep)
      } else {
        creep.attackTarget(targetStructures);
      }
    } else {
      // move to flag
      creep.moveCreepToExit(targetRoom);
    }
  }
};
