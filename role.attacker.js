const cachedData = require('cachedData');

module.exports = {
  run: function (creep) {
    const gFlags = cachedData.getFlags();
    let targetRoom;

    for (let flag in gFlags) {
      // localize attack flag room
      if (gFlags[flag].name === 'attack') {
        targetRoom = gFlags[flag].pos.roomName;
      }
    }

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
