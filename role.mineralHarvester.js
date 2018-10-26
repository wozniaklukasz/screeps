const roleHarvester = require('role.harvester');

const roleMineralHarvester = {
  run: function (creep) {
    const mineral = creep.pos.findClosestByRange(FIND_MINERALS);

    if (!mineral || creep.carry.energy) {
      roleHarvester.run(creep)
    } else {
      creep.memory.working = _.sum(creep.carry) !== creep.carryCapacity;

      if (creep.memory.working) {
        if (creep.harvest(mineral) === ERR_NOT_IN_RANGE) {
          creep.myMoveTo(mineral);
        }
      }

      else {
        const storage = creep.room.storage;

        if (creep.transfer(storage, mineral.mineralType) === ERR_NOT_IN_RANGE) {
          creep.myMoveTo(storage);
        }
      }
    }
  }
};

module.exports = roleMineralHarvester;
