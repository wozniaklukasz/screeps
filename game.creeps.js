const gameCreeps = {
  _creeps: {},

  setCreeps: function () {
    this._creeps = {};
    const gCreeps = Game.creeps;

    for (let creep in gCreeps) {
      this._creeps[gCreeps[creep].name] = gCreeps[creep];
    }
  },

  getCreepByName: function (name) {
    for (let creep in this._creeps) {
      if (creep.toString().toLowerCase() === name.toLowerCase()) {
        return this._creeps[creep];
      }
    }
    return null;
  },

  getCreeps() {
    return this._creeps;
  }
};

module.exports = gameCreeps;
