const config = require('config');

StructureTower.prototype.defend =
  function (targets) {
    let target = this.pos.findClosestByRange(targets);
    if (target) {
      this.attack(target);
    }
  };

StructureTower.prototype.healCreeps =
  function (targets) {
    let target = this.pos.findClosestByRange(targets);
    if (target) {
      this.heal(target);
    }
  };

StructureTower.prototype.repairStructure = function (structure) {
  if (structure) {
    this.repair(structure)
  }
};

//todo: heal creeps before repairStructures
