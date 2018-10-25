const config = require('config');

const logs = {
  logCpuUsage: function () {
    // this fn must be last in main loop

    // todo: refactoring code (duplicate for 1h and min)
    const ticksLimit = 60;

    if (config.booleans.enableCpuLog) {
      if (Memory._cpuIdx >= ticksLimit) {
        Memory._cpuLastCounted = getAvgCpu();

        Memory._cpuIdx = 0;
        Memory._cpuUsed = [];
      }

      if (!(Game.time % 30)) {
        Memory._cpuUsed[Memory._cpuIdx] = Game.cpu.getUsed();
        Memory._cpuIdx = Memory._cpuIdx + 1;
      }

      if (Memory._cpuIdxShort >= ticksLimit) {
        Memory._cpuLastCountedShort = getAvgCpuShort();

        Memory._cpuIdxShort = 0;
        Memory._cpuUsedShort = [];
      }

      if (!(Game.time % 5)) {
        Memory._cpuUsedShort[Memory._cpuIdxShort] = Game.cpu.getUsed();
        Memory._cpuIdxShort = Memory._cpuIdxShort + 1;
      }

      console.log('[CPU avg 1h][Now (' + (Memory._cpuIdx / ticksLimit * 100).toFixed(1) + '%): ' + getAvgCpu() + '][Last: ' + Memory._cpuLastCounted + ']'
        +
        '[CPU avg 10m][Now (' + (Memory._cpuIdxShort / ticksLimit * 100).toFixed(1) + '%): ' + getAvgCpuShort() + '][Last: ' + Memory._cpuLastCountedShort + ']');

    } else {
      Memory._cpuIdx = 0;
      Memory._cpuUsed = [];
    }
  },

  logGlobalInfo: function () {
    if (config.booleans.enableConsoleLog) {
      let gcl = Game.gcl;
      console.log('[GCL: ' + gcl.level + ' (xp: ' + Number.parseFloat(gcl.progress * 100 / gcl.progressTotal).toPrecision(3) + '%)]')
    }
  }
};

function add(a, b) {
  return a + b;
}

function getAvgCpu() {
  return (Memory._cpuUsed.reduce(add, 0) / Memory._cpuIdx + 1).toFixed(1)
}

function getAvgCpuShort() {
  return (Memory._cpuUsedShort.reduce(add, 0) / Memory._cpuIdxShort + 1).toFixed(1)
}

module.exports = logs;
