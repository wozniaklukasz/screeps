const flags = require('game.flags');

module.exports = {
  run: function (creep) {
    const targetFlag = flags.getFlagByName('reserved' + creep.memory.homeRoom);
    const targetRoom = targetFlag ? targetFlag.roomName : null;

    const room = creep.room;
    const controller = room.controller;

    if (room.name === targetRoom && controller) {
      if (creep.reserveController(controller) === ERR_NOT_IN_RANGE) {
        creep.myMoveTo(controller);
      }
    }
    else {
      creep.moveCreepToExit(targetRoom);
    }
  }
};

/*
// to spawn creep set 'sign' flag

Game.spawns['Odin'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CLAIM, CLAIM], 'signer', { memory: { role: 'signer'} } );
*/
