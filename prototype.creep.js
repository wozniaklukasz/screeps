const config = require('config');

Creep.prototype.runRole = function () {
  let roles = config.getRoles();

  if (this.room.memory.noHarvestersAlert) {
    // todo: exclude attacker from alert
    roles['harvester'].run(this);
  } else {
    roles[this.memory.role].run(this);
  }
};

Creep.prototype.getEnergy = function (useContainer, useSource) {
//   let container;
//   if (useContainer) {
//     container = this.pos.findClosestByPath(FIND_STRUCTURES, {
//       filter: s => (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) &&
//         s.store[RESOURCE_ENERGY] > 0
//     });
//     if (!container) {
//       if (this.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
//         this.moveTo(container);
//       }
//     }
//   }
//   if (!container && useSource) {
    let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

    if (this.harvest(source) === ERR_NOT_IN_RANGE) {
      this.moveTo(source);
    }
//   }
};

Creep.prototype.showCreepRole = function () {
  let text = '';
  if (this.memory.role === 'harvester') {
    text = '♻️';
  } else if (this.memory.role === 'builder') {
    text = '⚙️'
  } else if (this.memory.role === 'upgrader') {
    text = '⚡';
  } else if (this.memory.role === 'repairer') {
    text = '🛠️';
  } else if (this.memory.role === 'longDistanceHarvester') {
    text = '🔻';
  } else if (this.memory.role === 'wallRepairer') {
    text = '🛡️'
  } else if (this.memory.role === 'mineralHarvester') {
    text = 'mineral'
  } else if (this.memory.role === 'linkHarvester') {
    text = '🔷'
  } else if (this.memory.role === 'linkUpgrader') {
    text = '🔶'
  } else if (this.memory.role === 'attacker') {
    text = '⚔️'
  }

  this.say(text);
};

Creep.prototype.isCreepAbleToWork = function () {
  if (this.memory.working === true && this.carry.energy === 0) {
    this.memory.working = false;
  }
  else if (this.memory.working === false && this.carry.energy === this.carryCapacity) {
    this.memory.working = true;
  }
};
