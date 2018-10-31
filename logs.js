const config = require('config');
const utilsCreep = require('utils.creep');
const gFlags = require('game.flags');

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

    }
  },

  logGlobalInfo: function () {
    if (config.booleans.enableConsoleLog) {
      let gcl = Game.gcl;
      console.log('[GCL: ' + gcl.level + ' (xp: ' + Number.parseFloat(gcl.progress * 100 / gcl.progressTotal).toPrecision(3) + '%)]')
    }
  },

  logCreepsInfo: function (room, numberOfCreepsLiving, numberOfCreepsToDo) {
    if (config.booleans.enableConsoleLog && room.controller && room.controller.my) {
      let log = '';
      let storageInfo = '';

      if (config.booleans.storageAmountLog && !_.isEmpty(room.storage)) {
        storageInfo += '[Storage: ';
        const storageStore = room.storage.store;
        for (let mineral in storageStore) {
          storageInfo += '(' + mineral + ': ' + (storageStore[mineral] / 1000).toFixed(0) + 'k)';
        }
        storageInfo += ']';
      }

      const hrefLink = "#!/room/shard3/" + room.name;
      const link = "<a href=" + hrefLink + ">" + room.name + "</a>";

      log += '[' + link + ': (🔋️' + room.controller.level + ' (' + Number.parseFloat(room.controller.progress * 100 / room.controller.progressTotal).toPrecision(3) + '%))(⚡' + room.energyAvailable + '/' + room.energyCapacityAvailable + ')][Creeps: ';

      numberOfCreepsLiving.map(c => {
          if (numberOfCreepsToDo[c.role]) {
            log += '(' + utilsCreep.changeRoleToSymbol(c.role) + '' + c.number + '/' + numberOfCreepsToDo[c.role] + ')'
          }
        }
      );
      log += ']' + storageInfo;
      console.log(log);
    }
  },

  logFlags: function () {
    if (config.booleans.enableFlagsLog) {
      const flags = gFlags.getFlags();

      let log = '[Flags: ';

      for (let flag in flags) {
        const hrefLink = "#!/room/shard3/" + flags[flag].roomName;
        const link = "<a href=" + hrefLink + ">" + flag.toString() + "</a>";
        log += '(' + link + ')';
      }
      log += ']';
      console.log(log)
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
