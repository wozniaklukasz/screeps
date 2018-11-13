const config = require('config');

const gameRooms = {
  _rooms: {},

  setRooms: function () {
    this._rooms = {};
    const gRooms = Game.rooms;
    const roomMemoryToWrite = {};

    for (let r in gRooms) {
      const room = gRooms[r];

      roomMemoryToWrite[room.name] = {};

      this._rooms[room.name] = room;

      const controller = room.controller;

      if (controller) {
        if (controller.my) {
          const roomStructures = room.find(FIND_STRUCTURES);

          const constructionSites = room.find(FIND_CONSTRUCTION_SITES);

          const constructionSitesWithoutWallsAndRamparts = constructionSites.filter(s => s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART);

          const rampartsToBuild = constructionSites.filter((s) => s.structureType === STRUCTURE_RAMPART);

          const rampartsToMaintain = room.find((s) => (s.structureType === STRUCTURE_RAMPART) && s.hits < (config.constans.RAMPART_MAX_HITS * 0.95));

          const extractor = roomStructures.filter(s => s.structureType === STRUCTURE_EXTRACTOR);

          const storage = room.storage;

          const minerals = room.find(FIND_MINERALS);

          const mineralAmount = !_.isEmpty(minerals[0]) ? minerals[0].mineralAmount : 0;

          const linkConnections = config.getLinkConnections(room.name);
          if (!_.isEmpty(linkConnections)) {
            const linkSource = room.lookForAt('structure', linkConnections.linkSource.x, linkConnections.linkSource.y)[0];
            const linkController = room.lookForAt('structure', linkConnections.linkController.x, linkConnections.linkController.y)[0];

            if (linkSource && linkController) {
              roomMemoryToWrite[room.name].spawnLinkUpgraders = true;
              linkSource.transferEnergy(linkController);
            } else {
              roomMemoryToWrite[room.name].spawnLinkUpgraders = false;
            }
          } else {
            roomMemoryToWrite[room.name].spawnLinkUpgraders = false;
          }


          if (constructionSitesWithoutWallsAndRamparts.length > 0) {
            roomMemoryToWrite[room.name].spawnBuilder = true;
          } else {
            roomMemoryToWrite[room.name].spawnBuilder = false;
          }

          if (storage) {
            const mineralStored = _.sum(room.storage.store) - room.storage.store[RESOURCE_ENERGY];
            if (!_.isEmpty(extractor) && mineralAmount > 0 && mineralStored < 51000) {
              roomMemoryToWrite[room.name].spawnMineralHarvester = true;
            } else {
              roomMemoryToWrite[room.name].spawnMineralHarvester = false;
            }
          } else {
            roomMemoryToWrite[room.name].spawnMineralHarvester = false;
          }

          if (rampartsToBuild.length || rampartsToMaintain.length) {
            roomMemoryToWrite[room.name].spawnRampartRepairer = true;
          } else {
            roomMemoryToWrite[room.name].spawnRampartRepairer = false;
          }
        } // eo controller.my
      } // eo controller
    }

    Memory.rooms = roomMemoryToWrite;
  },

  getRooms() {
    return this._rooms;
  }
};

module.exports = gameRooms;
