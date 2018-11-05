const flags = require('game.flags');

module.exports = {
  run: function (creep) {
    const targetFlag = flags.getFlagByName('importerHarvester' + creep.memory.homeRoom);
    const targetRoom = targetFlag ? targetFlag.roomName : null;

    const room = creep.room;

    if (room.name === targetRoom && room.controller) {
      if (creep.reserveController(room.controller) === ERR_NOT_IN_RANGE) {
        creep.myMoveTo(room.controller);
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
