const flags = require('game.flags');

module.exports = {
  run: function (creep) {
    const targetFlag = flags.getFlagByName('attack');
    const targetRoom = targetFlag ? targetFlag.roomName : null;

    if (targetRoom && creep.room.name === targetRoom) {
      // attack
      const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if(target) {
        if(creep.memory.role === 'attackerRange') {
          creep.rangeAttackTarget(target);
        }
        if(creep.memory.role === 'attacker') {
          creep.attackTarget(target);
        }
      } else {
        // todo: destroy towers -> spawn -> other buildings
        const targetStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
            filter: (s) => s.structureType !== STRUCTURE_CONTROLLER});

        if(targetStructures) {
          creep.attackTarget(targetStructures);
        }
      }
    }
    else {
      // move to flag
      creep.moveCreepToExit(targetRoom);
    }
  }
};
