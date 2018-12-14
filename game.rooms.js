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
            const structures = room.find(FIND_STRUCTURES);

            const towers = structures.filter(s => s.structureType === STRUCTURE_TOWER);

            const hostileCreeps = room.find(FIND_HOSTILE_CREEPS);

            const myCreeps = room.find(FIND_MY_CREEPS);

            const isRoomUnderAttack = !_.isEmpty(hostileCreeps);

            const structureToRepair = structures.filter((s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
            )[0];

            const rampartToRepair = structures.filter((s) => s.structureType === STRUCTURE_RAMPART && s.hits < config.constans.RAMPART_MAX_HITS)[0];

            for (let tower of towers) {
              if (isRoomUnderAttack) {
                tower.defend(hostileCreeps);
              } else {
                tower.healCreeps(myCreeps.filter((c) => c.hits < c.hitsMax));

                if (structureToRepair) {
                  tower.repairStructure(structureToRepair);
                } else if (rampartToRepair) {
                  tower.repairStructure(rampartToRepair);
                }
              }
            }

            const constructionSites = room.find(FIND_CONSTRUCTION_SITES);

            const constructionSitesWithoutWallsAndRamparts = constructionSites.filter(s => s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART);

            const rampartsToBuild = constructionSites.filter((s) => s.structureType === STRUCTURE_RAMPART);

            const rampartsToMaintain = structures.find((s) => (s.structureType === STRUCTURE_RAMPART) && s.hits < (config.constans.RAMPART_MAX_HITS * 0.95));

            const extractor = structures.filter(s => s.structureType === STRUCTURE_EXTRACTOR);

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
                roomMemoryToWrite[room.name].linkSourceId = linkSource.id;
                roomMemoryToWrite[room.name].linkControllerId = linkController.id;
              } else {
                roomMemoryToWrite[room.name].spawnLinkUpgraders = false;
                roomMemoryToWrite[room.name].linkSourceId = null;
                roomMemoryToWrite[room.name].linkControllerId = null;
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
              if (!_.isEmpty(extractor) && mineralAmount > 0 && mineralStored < config.constans.STORAGE_MINERAL) {
                roomMemoryToWrite[room.name].spawnMineralHarvester = true;
              } else {
                roomMemoryToWrite[room.name].spawnMineralHarvester = false;
              }
            } else {
              roomMemoryToWrite[room.name].spawnMineralHarvester = false;
            }

            const lowEnergyTowers = towers.filter((t) => t.energy < t.energyCapacity * 0.2);

            if (rampartsToBuild.length || !_.isEmpty(rampartsToMaintain) || !_.isEmpty(lowEnergyTowers)) {
              roomMemoryToWrite[room.name].spawnRampartRepairer = true;
            } else {
              roomMemoryToWrite[room.name].spawnRampartRepairer = false;
            }

            // TODO autospawn wall
            // console.log(wallsToBuild)
            // if (!_.isEmpty(wallsToMaintain) || !_.isEmpty(wallsToBuild)) {
            //   roomMemoryToWrite[room.name].spawnWallRepairer = true;
            // } else {
            //   roomMemoryToWrite[room.name].spawnWallRepairer = false;
            // }


            if (config.booleans.enableBuildingByFlagsColors) {
              room.find(FIND_FLAGS).map(f => {
                let structure = config.getBuildingByFlagColor(f);
                if (structure) {
                  room.createConstructionSite(f.pos.x, f.pos.y, structure);
                }
              });
            }
          } // eo controller.my
        } // eo controller
      } // eo rooms loop

      Memory.rooms = roomMemoryToWrite;
    },

    getRooms() {
      return this._rooms;
    }
  }
;

module.exports = gameRooms;
