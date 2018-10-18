StructureTower.prototype.defend =
  function () {
    let target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
      this.attack(target);
    }
  };

StructureTower.prototype.repairStructures = function () {
  let structure = this.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
  });
  if (structure) {
    this.repair(structure)
  }
}

//todo: heal creeps before repairStructures
