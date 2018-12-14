const roleBuilder = require('role.builder');
const config = require('config');

module.exports = {
  run: function (creep) {
    creep.isCreepAbleToWork();

    if (creep.memory.working) {
      // care with this constants (CPU limit)
      // todo: rampart max hitpoints 1M, wall 300M
      const hitpointsIncrementation = 50000;
      let walls = [];
      let hitsWallToRepair = 0;

      const wallToBuild = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
        filter: (s) => s.structureType === STRUCTURE_WALL
      });

      if (wallToBuild) {
        creep.buildConstruction(wallToBuild);
      } else {
        const newWalls = creep.room.find(FIND_STRUCTURES, {
          filter: (s) => (s.structureType === STRUCTURE_WALL) && s.hits < 10
        });

        if (newWalls.length) {
          let wall = creep.pos.findClosestByRange(newWalls);

          if (creep.repair(wall) === ERR_NOT_IN_RANGE) {
            creep.myMoveTo(wall);
          }
        } else {
          while (!walls.length && hitsWallToRepair < config.constans.WALL_MAX_HITS) {
            hitsWallToRepair += hitpointsIncrementation;

            walls = creep.room.find(FIND_STRUCTURES, {
              filter: (s) => (s.structureType === STRUCTURE_WALL) && s.hits < hitsWallToRepair
            });

          }

          if (walls.length) {

            // build ramparts before walls
            let wall = creep.pos.findClosestByRange(walls);

            if (creep.repair(wall) === ERR_NOT_IN_RANGE) {
              creep.myMoveTo(wall);
            }
          }
          else {
            roleBuilder.run(creep);
          }
        }
      }
    }
    else {
      creep.getEnergy(true, true);
    }
  }
};
