const roleBuilder = require('role.builder');

module.exports = {
  run: function (creep) {
    creep.isCreepAbleToWork();

    if (creep.memory.working) {
      const RAMPART_MAX_HITPOINTS = 50000;
      const hitpointsIncrementation = 50000;
      let ramparts = [];
      let hitsWallToRepair = 0;

      const rampartToBuild = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
        filter: (s) => s.structureType === STRUCTURE_RAMPART
      });

      if (rampartToBuild) {
        creep.buildConstruction(rampartToBuild);
      } else {
        while (!ramparts.length && hitsWallToRepair < RAMPART_MAX_HITPOINTS) {
          hitsWallToRepair += hitpointsIncrementation;

          ramparts = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType === STRUCTURE_RAMPART) && s.hits < hitsWallToRepair
          });
        }

        if (ramparts.length) {
          // todo: (build problem) repair ramparts at 80% - because of decay
          // let ramparts = ramparts.filter(
          //   s => s.structureType === STRUCTURE_RAMPART && s.hits < hitsWallToRepair
          // );

          // build ramparts before ramparts
          let rampart = creep.pos.findClosestByRange(ramparts,
            {filter: s => s.hits < hitsWallToRepair});

          if (creep.repair(rampart) === ERR_NOT_IN_RANGE) {
            creep.myMoveTo(rampart);
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
