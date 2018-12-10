const flags = require('game.flags');

module.exports = {
  run: function (creep) {
    const targetFlag = flags.getFlagByName('sign');
    const targetRoom = targetFlag ? targetFlag.roomName : null;

    const room = creep.room;

    if (room.name === targetRoom && room.controller) {
      if (creep.signController(room.controller, 'RESERVATION!!!') === ERR_NOT_IN_RANGE) {
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

Game.spawns['Hades'].spawnCreep([MOVE], 'signer', { memory: { role: 'signer'} } );
*/
