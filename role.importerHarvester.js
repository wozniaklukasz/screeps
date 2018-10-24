const roleHarvester = require('role.harvester');

module.exports = {
  run: function (creep) {
    creep.isCreepAbleToWork();

    // find flag
    const gFlags = Game.flags;
    let targetRoom;

    for (let flag in gFlags) {
      if (gFlags[flag].name === 'importerHarvester' + creep.memory.homeRoom) {
        targetRoom = gFlags[flag].pos.roomName;
      }
    }

    // no flag = harvester
    if (!targetRoom) {
      const homeRoom = creep.memory.homeRoom;
      if (creep.room.name === homeRoom) {
        roleHarvester.run(creep);
      }
      else {
        let exit = creep.room.findExitTo(homeRoom);
        creep.moveTo(creep.pos.findClosestByRange(exit));
      }
    } else {
      if (creep.memory.working) {
        const constructionRoad = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
          filter: (s) => s.structureType === STRUCTURE_ROAD
        });

        // import energy if no roads to build
        if (constructionRoad) {
          if (creep.build(constructionRoad) === ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionRoad);
          }
        }
        else {
          const homeRoom = creep.memory.homeRoom;
          if (creep.room.name === homeRoom) {
            roleHarvester.run(creep);
          }
          else {
            let exit = creep.room.findExitTo(homeRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
          }
        }
      } else {
        if (creep.room.name === targetRoom) {
          creep.getEnergy(false, true);
        }
        else {
          let exit = creep.room.findExitTo(targetRoom);
          creep.moveTo(creep.pos.findClosestByRange(exit));
        }
      }
    }
  }
};