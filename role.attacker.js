const flags = require('game.flags');

module.exports = {
  run: function (creep) {
    const targetFlag = flags.getFlagByName('attack');
    const targetRoom = targetFlag ? targetFlag.roomName : null;

    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    // attack
    if (target) {
      if (creep.memory.role === 'attackerRange') {
        creep.rangeAttackTarget(target);
      }
      if (creep.memory.role === 'attacker') {
        creep.attackTarget(target);
      }
    } else {
      const targetStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
        filter: (s) => s.structureType !== STRUCTURE_CONTROLLER
      });

      // const targetWalls = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,  {filter: {structureType: STRUCTURE_WALL}});
      //
      // console.log('wa;s', targetStructures)

      if (targetStructures) {
        creep.attackTarget(targetStructures);
      } else {
        // move to flag
        creep.moveCreepToExit(targetRoom);
      }
    }
  }
};
