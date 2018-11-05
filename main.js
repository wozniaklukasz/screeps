require('prototype.creep');
require('prototype.room');
require('prototype.spawn');
require('prototype.tower');
require('prototype.link');

const logs = require('logs');
const memoryClearing = require('memory.clearing');
const utilsLink = require('utils.link');
const flags = require('game.flags');
const creeps = require('game.creeps');

module.exports.loop = function () {
  console.log();
  logs.logGlobalInfo();

  memoryClearing.creepMemoryClearing();
  memoryClearing.roomMemoryClearing();

  flags.setFlags();
  creeps.setCreeps();

  utilsLink.linksTransfers();

  const gCreeps = creeps.getCreeps();

  for (let creep in gCreeps) {
    let cr = gCreeps[creep];
    cr.runRole();
    cr.showCreepRole();
  }

  for (let room in Game.rooms) {
    Game.rooms[room].buildStructuresOnFlags();
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

  logs.logFlags();
  logs.logCpuUsage();
};
