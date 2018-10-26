const roleHarvester = require('role.builder');
const flags = require('flags');

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
        }
        else {
          const homeRoom = creep.memory.homeRoom;
          if (creep.room.name === homeRoom) {
            roleHarvester.run(creep);
          }
          else {
            creep.moveCreepToExit(homeRoom);
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
