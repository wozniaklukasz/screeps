const config = require('config');

require('prototype.creep');
require('prototype.room');
require('prototype.spawn');
require('prototype.tower');
require('prototype.link');
const utilsLink = require('utils.link');

module.exports.loop = function () {
  creepMemoryClearing();
  logGlobalInfo();
  utilsLink.linksTransfers();

  for (let creep in Game.creeps) {
    let cr = Game.creeps[creep];
    cr.runRole();
    cr.showCreepRole();
  }

  for (let room in Game.rooms) {
    //Game.rooms[room].buildStructuresOnFlags();
    Game.rooms[room].logPopulation();
  }

  for (let spawn in Game.spawns) {
    let sp = Game.spawns[spawn];
    sp.spawnCreepsIfNecessary();
    sp.spawningInfo();
  }

  let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
  for (let tower of towers) {
    tower.defend();
    tower.repairStructures();
  }

  logCpuUsage();
};

function creepMemoryClearing() {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }
}

function logGlobalInfo() {
  if (config.booleans.enableConsoleLog) {
    let gcl = Game.gcl;
    console.log('[GCL: ' + gcl.level + ' (xp: ' + Number.parseFloat(gcl.progress * 100 / gcl.progressTotal).toPrecision(3) + '%)]')
  }
}

function logCpuUsage() {
  // this fn must be last in main loop
  const ticksLimit = 1024;

  if (config.booleans.enableCpuLog) {
    if (Memory._cpuIdx === ticksLimit) {
      Memory._cpuLastCounted = getAvgCpu();

      Memory._cpuUsed = [];
      Memory._cpuIdx = 0;
    }

    Memory._cpuUsed[Memory._cpuIdx] = Game.cpu.getUsed();
    Memory._cpuIdx = Memory._cpuIdx + 1;

    console.log('[Avg cpu ('  + (Memory._cpuIdx / ticksLimit * 100).toFixed(1) + '%): ' + getAvgCpu() + '][Last avg cpu: ' + Memory._cpuLastCounted + ']');
  } else {
    Memory._cpuIdx = 0;
    Memory._cpuUsed = [];
  }
}

// todo: lodash
function add(a, b) {
  return a + b;
}

function getAvgCpu() {
  return (Memory._cpuUsed.reduce(add, 0) / Memory._cpuIdx + 1).toFixed(1)
}
