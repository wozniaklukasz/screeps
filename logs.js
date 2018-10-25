const config = require('config');

const logs = {
  logCpuUsage: function () {
    // this fn must be last in main loop

    // todo: refactoring code (duplicate for 1h and min)
    const ticksLimit = 60;

    if (config.booleans.enableCpuLog) {
      if (Memory.cpu.cpuIdx >= ticksLimit) {
        Memory.cpu.cpuLastCounted = getAvgCpu();

        Memory.cpu.cpuIdx = 0;
        Memory.cpu.cpuUsed = [];
      }

      if (!(Game.time % 30)) {
        Memory.cpu.cpuUsed[Memory.cpu.cpuIdx] = Game.cpu.getUsed();
        Memory.cpu.cpuIdx = Memory.cpu.cpuIdx + 1;
      }

      if (Memory.cpu.cpuIdxShort >= ticksLimit) {
        Memory.cpu.cpuLastCountedShort = getAvgCpuShort();

        Memory.cpu.cpuIdxShort = 0;
        Memory.cpu.cpuUsedShort = [];
      }

      if (!(Game.time % 5)) {
        Memory.cpu.cpuUsedShort[Memory.cpu.cpuIdxShort] = Game.cpu.getUsed();
        Memory.cpu.cpuIdxShort = Memory.cpu.cpuIdxShort + 1;
      }

      console.log('[CPU avg 1h][Now (' + (Memory.cpu.cpuIdx / ticksLimit * 100).toFixed(1) + '%): ' + getAvgCpu() + '][Last: ' + Memory.cpu.cpuLastCounted + ']'
        +
        '[CPU avg 10m][Now (' + (Memory.cpu.cpuIdxShort / ticksLimit * 100).toFixed(1) + '%): ' + getAvgCpuShort() + '][Last: ' + Memory.cpu.cpuLastCountedShort + ']');

    } else {
      resetCpuMemory();
    }
  },

  logGlobalInfo: function () {
    if (config.booleans.enableConsoleLog) {
      let gcl = Game.gcl;
      console.log('[GCL: ' + gcl.level + ' (xp: ' + Number.parseFloat(gcl.progress * 100 / gcl.progressTotal).toPrecision(3) + '%)]')
    }
  }
};

function resetCpuMemory() {
  Memory.cpu = {};
  Memory.cpu.cpuIdx = 0;
  Memory.cpu.cpuUsed = [];
  Memory.cpu.cpuIdxShort = 0;
  Memory.cpu.cpuUsedShort = [];
}

function add(a, b) {
  return a + b;
}

function getAvgCpu() {
  return (Memory.cpu.cpuUsed.reduce(add, 0) / Memory.cpu.cpuIdx + 1).toFixed(1)
}

function getAvgCpuShort() {
  return (Memory.cpu.cpuUsedShort.reduce(add, 0) / Memory.cpu.cpuIdxShort + 1).toFixed(1)
}

module.exports = logs;
