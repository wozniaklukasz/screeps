module.exports = {
    run: function (creep) {
        if (creep.room.name === creep.memory.target) {
            if (creep.room.controller) {
                if (creep.signController(creep.room.controller, "Na pohybel wszystkim!") === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        else {
            let exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};

/*
// to spawn creep enter target room name

Game.spawns['Thor'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    'signer',
    { memory: { role: 'signer', target: '' } } );
*/