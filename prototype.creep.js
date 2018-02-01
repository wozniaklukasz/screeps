const config = require('config');

Creep.prototype.runRole = function () {
    let roles = config.getRoles();
    roles[this.memory.role].run(this);
};

Creep.prototype.getEnergy = function (useContainer, useSource) {
    let container;
    if (useContainer) {
        container = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) &&
                s.store[RESOURCE_ENERGY] > 0
        });
        if (!container) {
            if (this.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                this.moveTo(container);
            }
        }
    }
    if (!container && useSource) {
        let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

        if (this.harvest(source) === ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }
    }
};

Creep.prototype.showCreepRole = function () {
    if (this.memory.role === 'harvester') {
        text = '♻';
    } else if (this.memory.role === 'builder') {
        text = '🚧';
    } else if (this.memory.role === 'upgrader') {
        text = '🗲';
    } else if (this.memory.role === 'repairer') {
        text = '⚒';
    } else if (this.memory.role === 'longDistanceHarvester') {
        text = '🚀';
    }
    this.say(text);
};
