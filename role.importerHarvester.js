const roleHarvester = require('role.builder');
const flags = require('game.flags');

// upgrader instead of harvest???
module.exports = {
  run: function (creep) {
    creep.isCreepAbleToWork();

    const targetFlag = flags.getFlagByName('importerHarvester' + creep.memory.homeRoom);
    const targetRoom = targetFlag ? targetFlag.roomName : null;

    // no flag = harvester
    if (!targetRoom) {
      const homeRoom = creep.memory.homeRoom;
      if (creep.room.name === homeRoom) {
        roleHarvester.run(creep);
      }
      else {
        creep.moveCreepToExit(homeRoom);
      }
    } else {
      if (creep.memory.working) {
        const constructionRoad = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
          filter: (s) => s.structureType === STRUCTURE_ROAD
        });

        // import energy if no roads to build
        if (constructionRoad) {
          creep.buildConstruction(constructionRoad);
        } else {
          const extensions = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType === STRUCTURE_SPAWN
              || s.structureType === STRUCTURE_EXTENSION)
              && s.energy < s.energyCapacity
          });

          if (extensions) {
            if (creep.transfer(extensions, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.myMoveTo(extensions);
            }
          } else {
            const homeRoom = creep.memory.homeRoom;
            if (creep.room.name === homeRoom) {
              roleHarvester.run(creep);
            }
            else {
              creep.moveCreepToExit(homeRoom);
            }
          }
        }
      } else {
        if (creep.room.name === targetRoom) {
          creep.getEnergy(false, true);
        }
        else {
          creep.moveCreepToExit(targetRoom);
        }
      }
    }
  }
};
