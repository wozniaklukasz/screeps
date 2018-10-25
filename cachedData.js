let flags;

const cachedData = {
  cacheData: function () {
    if(!(Game.time % 5)) {
      // cache flags every 10 sec
      Memory.flags = Game.flags;
    }
  },

  initData: function() {
    flags = Memory.flags;
  },

  getFlags: function () {
    return flags;
  }
};

function resetMemoryFlags() {
  Memory.flags = {};
}

module.exports = cachedData;
