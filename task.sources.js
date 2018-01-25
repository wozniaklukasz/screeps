var taskSources = function(creep) {
    var sources = creep.room.find(FIND_SOURCES);
    var source = 0;
    if (sources.length > 0) {
        source = creep.memory.role  === 'harvester' ? 1 : 0;
    }
    if (creep.harvest(sources[source]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[source], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
};

module.exports = taskSources;