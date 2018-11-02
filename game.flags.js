const gameFlags = {
  _flags: {},

  setFlags: function () {
    this._flags = {};
    const gFlags = Game.flags;

    for (let flag in gFlags) {
      this._flags[gFlags[flag].name] = gFlags[flag].pos;
    }
  },

  getFlagByName: function (name) {
    for (let flag in this._flags) {
      if (flag.toString().toLowerCase() === name.toLowerCase()) {
        return this._flags[flag];
      }
    }
    return null;
  },

  getFlags() {
    return this._flags;
  }

  // getFlagsByNameContains: function (partOfFlagName) {
  //   // CARE, high CPU usage :(
  //   let result = [];
  //   for (let flag in this._flags) {
  //     if (flag.toString().toLowerCase().includes(partOfFlagName.toLowerCase())) {
  //       result.push(this._flags[flag]);
  //     }
  //   }
  //   return result;
  // }
};

module.exports = gameFlags;
