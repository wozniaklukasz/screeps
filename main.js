require('prototype.creep');
require('prototype.room');
require('prototype.spawn');
require('prototype.tower');
require('prototype.link');

const logs = require('logs');
const memoryClearing = require('memory.clearing');
const flags = require('game.flags');
const creeps = require('game.creeps');
const rooms = require('game.rooms');

module.exports.loop = function () {
  console.log();
  logs.logGlobalInfo();

  memoryClearing.creepMemoryClearing();
  memoryClearing.roomMemoryClearing();

  flags.setFlags();
  creeps.setCreeps();
  rooms.setRooms();

  const gCreeps = creeps.getCreeps();
  const gRooms = rooms.getRooms();


  for (let creep in gCreeps) {
    let cr = gCreeps[creep];
    cr.runRole();
    cr.showCreepRole();
  }

  for (let spawn in Game.spawns) {
    let sp = Game.spawns[spawn];
    sp.spawnCreepsIfNecessary();
    sp.spawningInfo();
  }

  // testRoadCreation()

  logs.logFlags();
  logs.logCpuUsage();
};

function testRoadCreation() {
  // todo: build road on source - bug
  const spawn = Game.spawns['Gaia'];
  if (spawn) {
    const sources = spawn.room.find(FIND_SOURCES);
    for (let j = 0; j < sources.length; j++) {
      const chemin = spawn.pos.findPathTo(sources[j].pos);
      for (let i = 0; i < chemin.length; i++) {
        spawn.room.createConstructionSite(chemin[i].x, chemin[i].y, STRUCTURE_ROAD);
      }
    }
  }
}
