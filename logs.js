const config = require('config');
const utilsCreep = require('utils.creep');
const gFlags = require('game.flags');

const logs = {
  _cpuIdx: 0,
  _cpuLastCounted: 0,
  _cpuUsed: [],
  _cpuIdxShort: 0,
  _cpuUsedShort: [],

  logCpuUsage: function () {
    // this fn must be last in main loop

    // todo: refactoring code (duplicate for 1h and min)
    const ticksLimit = 60;

    if (config.booleans.enableCpuLog) {
      const cpuUsed = Game.cpu.getUsed();

      // ~1 h
      if (this._cpuIdx >= 1800) {
        Memory.cpu.cpuLastCounted = getAvgCpu(this._cpuUsed, this._cpuIdx);

        this._cpuIdx = 0;
        this._cpuUsed = [];
      }

      this._cpuUsed[this._cpuIdx] = cpuUsed;
      this._cpuIdx = this._cpuIdx + 1;

      // ~5 min
      if (this._cpuIdxShort >= 150) {
        Memory.cpu.cpuLastCountedShort = getAvgCpu(this._cpuUsedShort, this._cpuIdxShort);

        this._cpuIdxShort = 0;
        this._cpuUsedShort = [];
      }

      this._cpuUsedShort[this._cpuIdxShort] = cpuUsed;
      this._cpuIdxShort = this._cpuIdxShort + 1;

      console.log('[CPU avg 1h][Now (' + (this._cpuIdx / 1800 * 100).toFixed(1) + '%): ' + getAvgCpu(this._cpuUsed, this._cpuIdx) + '][Last: ' + Memory.cpu.cpuLastCounted + ']'
        +
        '[CPU avg 5m][Now (' + (this._cpuIdxShort / 150 * 100).toFixed(1) + '%): ' + getAvgCpu(this._cpuUsedShort, this._cpuIdxShort) + '][Last: ' + Memory.cpu.cpuLastCountedShort + ']');

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

      const hrefLink = "#!/room/shard3/" + room.name;
      const link = "<a href=" + hrefLink + ">" + room.name + "</a>";
      let lvlProgress = '';
      const totalCtrlProgress = room.controller.progressTotal;

      if (totalCtrlProgress) {
        lvlProgress =  ' (' + Number.parseFloat(room.controller.progress * 100 / room.controller.progressTotal).toPrecision(3) + '%)';
      }

      log += '[' + link + ': (🔋️' + room.controller.level +  lvlProgress + ')(⚡' + room.energyAvailable + '/' + room.energyCapacityAvailable + ')][Creeps: ';

      numberOfCreepsLiving.map(c => {
          if (numberOfCreepsToDo[c.role]) {
            log += '(' + utilsCreep.changeRoleToSymbol(c.role) + '' + c.number + '/' + numberOfCreepsToDo[c.role] + ')'
          }
        }
      );
      log += ']' + this.logStorageInfo(room);
      console.log(log);
    }
  },

  logStorageInfo: function(room) {
    let storageInfo = '';

    if (config.booleans.storageAmountLog && !_.isEmpty(room.storage)) {
      storageInfo += '[Storage: ';
      const storageStore = room.storage.store;
      for (let mineral in storageStore) {
        storageInfo += '(' + convertMineralTypeToString(mineral) + ': ' + (storageStore[mineral] / 1000).toFixed(0) + 'k)';
      }
      storageInfo += ']';
    }

    return storageInfo;
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

function add(a, b) {
  return a + b;
}

function getAvgCpu(cpuUsed, cpuIdx) {
  return (cpuUsed.reduce(add, 0) / cpuIdx + 1).toFixed(1)
}

function convertMineralTypeToString(mineral) {
  if (mineral === 'energy') {
    return '⚡';
  }
  let color = '#afafaf';
  if (mineral === 'X') {
    color = '#fc7776';
  } else if (mineral === 'U') {
    color = '#3db7d9'
  } else if (mineral === 'K') {
    color = '#a071fb'
  } else if (mineral === 'L') {
    color = '#23a470'
  } else if (mineral === 'Z') {
    color = '#fdd388'
  }
  return '<font color='+color+' type="highlight">' + mineral + "</font>";
}

module.exports = logs;
