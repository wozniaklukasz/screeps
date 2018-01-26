var taskSources = require('task.sources');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep = Game.creeps[creep.name];

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            taskSources(creep);
        }
    }
};

module.exports = roleBuilder;


    /*
    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
filter: (s) => s.structureType == STRUCTURE_WALL &&
s.hits / s.hitsMax < percentage
});

     */
