const config = require('config');

Room.prototype.buildStructuresOnFlags = function () {
  if (!config.booleans.enableBuildingByFlagsColors) {
    return;
  }

  this.find(FIND_FLAGS).map(f => {
    let structure = config.getBuildingByFlagColor(f);
    if (structure) {
      this.createConstructionSite(f.pos.x, f.pos.y, structure);
    }
  })
};

Room.prototype.getNumberOfCreepsByRoomName = function () {
  let roleCounter = [];

  const roles = config.getRoles();

  Object.keys(roles).map(role => {
    roleCounter.push({
      role: role,
      number: _(Memory.creeps).filter({role: role, homeRoom: this.name}).size()
    });
  });
  return roleCounter;
};
