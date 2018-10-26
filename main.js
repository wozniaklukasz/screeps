require('prototype.creep');
require('prototype.room');
require('prototype.spawn');
require('prototype.tower');
require('prototype.link');

const logs = require('logs');
const memoryClearing = require('memory.clearing');
const utilsLink = require('utils.link');
const flags = require('flags');

module.exports.loop = function () {
  console.log();
  logs.logGlobalInfo();

  memoryClearing.creepMemoryClearing();
  memoryClearing.roomMemoryClearing();

  flags.setFlags();

  utilsLink.linksTransfers();

  for (let creep in Game.creeps) {
    let cr = Game.creeps[creep];
    cr.runRole();
    cr.showCreepRole();
  }

  for (let room in Game.rooms) {
    Game.rooms[room].buildStructuresOnFlags();
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

  logs.logCpuUsage();
};
