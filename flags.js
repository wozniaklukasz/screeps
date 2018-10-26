
const flags = {
  _flags: {},

  setFlags: function () {
    const gFlags = Game.flags;

    for (let flag in gFlags) {
      this._flags[gFlags[flag].name] = gFlags[flag].pos;
    }

    // if (!(Game.time % 10)) {
    //   for (let flag in gFlags) {
    //     Memory.flags[gFlags[flag].name] = JSON.stringify(gFlags[flag].pos);
    //     console.log('flag cache')
    //   }
    // }
    //
    //
    // for (let flag in Memory.flags) {
    //   console.log('read', JSON.parse(Memory.flags[flag]).x)
    // }
  },

  getFlags: function () {
    return this._flags;
  },

  getFlagByName: function (name) {
    for (let flag in this._flags) {
      if (flag.toString() === name) {
        return this._flags[flag];
      }
    }
    return null;
  },

  getFlagsByNameContains: function (partOfFlagName) {

  }
};

module.exports = flags;
