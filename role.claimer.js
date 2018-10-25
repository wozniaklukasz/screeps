roleClaimer = {
  run: function (creep) {
    if (creep.room.name === creep.memory.targetRoom) {
      if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
    else {
      creep.moveCreepToExit(creep.memory.targetRoom);
    }
  }
};

module.exports = roleClaimer;

/*
// to spawn creep enter target room name

Game.spawns['Thor'].spawnCreep([MOVE, MOVE, CLAIM],
    'claimer',
    { memory: { role: 'claimer', targetRoom: '' } } );
*/
