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

    // add builder if constructions
    // todo: refactoring with builder creep logic
    // one method returns construction sites with getter
    if (room.find(FIND_CONSTRUCTION_SITES).length > 0) {
      numberOfCreeps.builder = 1
    }

    const myStructures = room.find(FIND_MY_STRUCTURES);

    // todo: spawn mineral harvester as room bool and call from memory (?)
    const extractor = _.filter(myStructures, s => s.structureType === STRUCTURE_EXTRACTOR);
    const mineralAmount = room.find(FIND_MINERALS)[0].mineralAmount;
    const mineralStored = _.sum(room.storage.store) - room.storage.store[RESOURCE_ENERGY];
    if (!_.isEmpty(extractor) && mineralAmount > 0 && mineralStored < 50000) {
      numberOfCreeps.mineralHarvester = 1
    }

    const roomMemory = Memory.rooms[room.name];
    if (roomMemory.linkSourceId && roomMemory.linkControllerId) {
      numberOfCreeps.harvester = 1;
      numberOfCreeps.linkHarvester = 1;
      numberOfCreeps.linkUpgrader = 1;
    }

    return numberOfCreeps;
  }
};

function sumObjFiled(filedVal, value) {
  return filedVal ? filedVal + value : value
}
