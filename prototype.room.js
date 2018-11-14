const config = require('config');

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
