const flags = require('game.flags');

roleClaimer = {
  run: function (creep) {
    const targetFlag = flags.getFlagByName('claim');
    const targetRoom = targetFlag ? targetFlag.roomName : null;

    if (creep.room.name === targetRoom) {
      if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.myMoveTo(creep.room.controller);
      }
    }
    else {
      creep.moveCreepToExit(targetRoom);
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
