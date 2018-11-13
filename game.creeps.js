const gameCreeps = {
  _creeps: {},

  setCreeps: function () {
    this._creeps = {};
    const gCreeps = Game.creeps;

    for (let creep in gCreeps) {
      this._creeps[gCreeps[creep].name] = gCreeps[creep];
    }
  },

  getCreeps() {
    return this._creeps;
  }
};

module.exports = gameCreeps;
