const memoryClearing = {
  creepMemoryClearing: function () {
    for (let name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }
  },

  roomMemoryClearing: function () {
    for (let room in Memory.rooms) {
      if (_.isEmpty(Memory.rooms[room])) {
        delete Memory.rooms[room];
        // console.log('Clearing empty room memory:', room);
      }
    }
  }
};

module.exports = memoryClearing;
