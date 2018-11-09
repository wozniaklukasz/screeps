const config = require('config');

module.exports = {
  getSpawnedCreepBody: function (energy, role) {
    let body = [WORK, WORK, CARRY, MOVE];

    if (energy >= 550) {
      body = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
    }
    if (energy >= 800) {
      body = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    }
    if (energy >= 1300) {
      body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
    }
    if (energy >= 1800) {
      body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
    }

    //if (energy >= 2300) {
    //    body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
    //}

    if (role === 'attacker') {
      // 1800 energy
      body = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK]
    }

    if (role === 'attackerRange') {
      // 2360 energy
      body = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK]
    }

    if (role === 'reserver') {
      body = [MOVE, MOVE, CLAIM, CLAIM];
    }

    if (role === 'importerRepairer') {
      body = [MOVE, MOVE, WORK, CARRY, CARRY];
    }

    return body;
  },
  spawnCreepByCondition: function (numberOfCreeps, room) {
    if (room.find(FIND_CONSTRUCTION_SITES, {
      filter: (s) => s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
    }).length > 0) {
      numberOfCreeps.builder = 1
    }

    const myStructures = room.find(FIND_MY_STRUCTURES);
    const extractor = _.filter(myStructures, s => s.structureType === STRUCTURE_EXTRACTOR);
    const mineralAmount = room.find(FIND_MINERALS)[0].mineralAmount;
    const storage = room.storage;
    if (storage) {
      const mineralStored = _.sum(room.storage.store) - room.storage.store[RESOURCE_ENERGY];
      if (!_.isEmpty(extractor) && mineralAmount > 0 && mineralStored < 51000) {
        numberOfCreeps.mineralHarvester = 1
      }
    }

    const roomMemory = Memory.rooms[room.name];
    if (roomMemory.linkSourceId && roomMemory.linkControllerId) {
      numberOfCreeps.harvester = 1;
      numberOfCreeps.linkHarvester = 1;
      numberOfCreeps.linkUpgrader = 1;
    } else {
      numberOfCreeps.harvester = 2;
      numberOfCreeps.upgrader = 1;
    }

    // spawn rampartRepairer (helper) if ramparts are at 95%
    const rampartsToBuild = room.find(FIND_CONSTRUCTION_SITES, {
      filter: (s) => s.structureType === STRUCTURE_RAMPART
    });
    const rampartsToMaintain = room.find(FIND_STRUCTURES, {
      filter: (s) => (s.structureType === STRUCTURE_RAMPART) && s.hits < (config.constans.RAMPART_MAX_HITS * 0.95)
    });

    if (rampartsToBuild.length || rampartsToMaintain.length) {
      numberOfCreeps.rampartRepairer = 1;
    }
//     const targetFlag = flags.getFlagByName('reserved' + room.name);
//     if (targetFlag) {
//       const roomWithFlag = Game.rooms[targetFlag.pos.roomName];
// console.log(roomWithFlag)
//       if (!_.isEmpty(roomWithFlag)) {
//         const enemy = roomWithFlag.find(FIND_HOSTILE_CREEPS);
//         console.log(room.name)
//
//         // doesnt work if override val in config :( - todo
//         if (enemy.length === 0) {
//           console.log(1)
//           if (roomWithFlag.controller.reservation.ticksToEnd < 4000) {
//             numberOfCreeps.reserver = 1;
//           }
//
//           numberOfCreeps.importerHarvester = 2;
//           numberOfCreeps.importerRepairer = 1;
//         }
//
//       }
//     }

    return numberOfCreeps;
  }
};
