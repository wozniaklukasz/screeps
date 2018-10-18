const roleBuilder = require('role.builder');

module.exports = {
  run: function (creep) {
    creep.isCreepAbleToWork();

    if (creep.memory.working) {
      // care with this constants (CPU limit)
// todo: rampart max hitpoints 1M, wall 300M
      const WALL_MAX_HITPOINTS = 1000000;
      const hitpointsIncrementation = 50000;
      let walls = [];
      let hitsWallToRepair = 0;

      const wallsToBuild = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
        filter: (s) => s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_RAMPART
      });

      if (wallsToBuild) {
        if (creep.build(wallsToBuild) === ERR_NOT_IN_RANGE) {
          creep.moveTo(wallsToBuild);
        }
      } else {

        while (!walls.length && hitsWallToRepair < WALL_MAX_HITPOINTS) {
          hitsWallToRepair += hitpointsIncrementation;

          walls = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_RAMPART) && s.hits < hitsWallToRepair
          });

        }

        if (walls.length) {
          let ramparts = walls.filter(
            s => s.structureType === STRUCTURE_RAMPART && s.hits < hitsWallToRepair
          );

          // build ramparts before walls
          let wall = creep.pos.findClosestByRange(ramparts.length ? ramparts : walls);

          if (creep.repair(wall) === ERR_NOT_IN_RANGE) {
            creep.moveTo(wall);
          }
        }
        else {
          roleBuilder.run(creep);
        }
      }
    }
    else {
      creep.getEnergy(true, true);
    }
  }
};
