const config = require('config');
const utilsCreep = require('utils.creep');

Creep.prototype.runRole = function () {
  let roles = config.getRoles();

  if (this.room.memory.noHarvestersAlert && this.memory.role !== 'attacker') {
    // todo: exclude attacker from alert
    roles['harvester'].run(this);
  } else {
    roles[this.memory.role].run(this);
  }
};

Creep.prototype.myMoveTo = function (target) {
  this.moveTo(target, {visualizePathStyle: {
      fill: 'transparent',
      stroke: '#0f0',
      lineStyle: 'dashed',
      strokeWidth: .1,
      opacity: 1
    }});
};

Creep.prototype.getEnergy = function (useContainer, useSource) {
  let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
// console.log(this.pos.find(FIND_SOURCES_ACTIVE))
  if (source) {
    if (this.harvest(source) === ERR_NOT_IN_RANGE) {
      this.myMoveTo(source);
    }
  } else {
    const storage = this.room.storage;

    if(!_.isEmpty(storage) && this.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      this.myMoveTo(storage);
    }
  }
};

Creep.prototype.showCreepRole = function () {
  this.say(utilsCreep.changeRoleToSymbol(this.memory.role));
};

Creep.prototype.isCreepAbleToWork = function () {
  if (this.memory.working === true && this.carry.energy === 0) {
    this.memory.working = false;
  }
  else if (this.memory.working === false && this.carry.energy === this.carryCapacity) {
    this.memory.working = true;
  }
};

Creep.prototype.moveCreepToExit = function (target) {
  const exit = this.room.findExitTo(target);
  this.myMoveTo(this.pos.findClosestByRange(exit));
};

Creep.prototype.buildConstruction = function (construction) {
  if (this.build(construction) === ERR_NOT_IN_RANGE) {
    this.myMoveTo(construction);
  }
};

Creep.prototype.attackTarget = function (target) {
  if (this.attack(target) === ERR_NOT_IN_RANGE) {
    this.myMoveTo(target);
  }
};

Creep.prototype.rangeAttackTarget = function (target) {
  if (this.rangedAttack(target) === ERR_NOT_IN_RANGE) {
    this.myMoveTo(target);
  }
};
