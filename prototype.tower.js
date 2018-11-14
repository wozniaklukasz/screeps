const config = require('config');

StructureTower.prototype.defend =
  function () {
    let target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
      this.attack(target);
    }
  };

StructureTower.prototype.repairStructures = function () {
  const structureToRepairId = Memory.rooms[this.room.name].structureToRepair;

  if (structureToRepairId) {
    this.repair(Game.getObjectById(structureToRepairId))
  } else {
    const rampartToRepairId = Memory.rooms[this.room.name].rampartToRepair;

    if (rampartToRepairId) {
      this.repair(Game.getObjectById(rampartToRepairId))
    }
  }
};

//todo: heal creeps before repairStructures
