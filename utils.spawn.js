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

    if (role === 'importerReserver') {
      body = [MOVE, MOVE, CLAIM, CLAIM];
    }

    if (role === 'importerRepairer') {
      body = [MOVE, MOVE, WORK, CARRY, CARRY];
    }

    return body;
  },
  spawnCreepByCondition: function (numberOfCreeps, room) {
    const roomMemory = Memory.rooms[room.name];

    if (roomMemory.spawnBuilder) {
      numberOfCreeps.builder = 1
    }

    if (roomMemory.spawnMineralHarvester) {
      numberOfCreeps.mineralHarvester = 1
    }

    if (roomMemory.spawnRampartRepairer) {
      numberOfCreeps.rampartRepairer = 1;
    }

    // TODO autospawn wall
    // if (roomMemory.spawnWallRepairer) {
    //   numberOfCreeps.spawnWallRepairer = 1
    // }

    if (roomMemory.spawnLinkUpgraders) {
      numberOfCreeps.harvester = 1;
      numberOfCreeps.linkHarvester = 1;
      numberOfCreeps.linkUpgrader = 1;
    } else {
      numberOfCreeps.harvester = 2;
      numberOfCreeps.upgrader = 1;
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
