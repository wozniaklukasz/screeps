module.exports = {
  run: function (creep) {
    const gFlags = Game.flags;
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
        if(creep.attack(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      } else {
        // todo: destroy towers -> spawn -> other buildings
        const targetStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
            filter: (s) => s.structureType !== STRUCTURE_CONTROLLER});

        if(targetStructures) {
          if(creep.attack(targetStructures) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targetStructures);
          }
        }
      }
    }
    else {
      // move to flag
      let exit = creep.room.findExitTo(targetRoom);
      creep.moveTo(creep.pos.findClosestByRange(exit));
    }
  }
};
