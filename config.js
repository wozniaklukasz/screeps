const config = {
  booleans: {
    enableBuildingByFlagsColors: true,
    enableConsoleLog: true,
    storageAmountLog: true,
    enableCpuLog: true,
    enableFlagsLog: true,
  },
  getNumberOfCreepsToDo: function (room) {
    const roomName = room.name;
    let numberOfCreeps = {};

    if (roomName === 'W2S19') {
      numberOfCreeps.importerHarvester = 2;
      numberOfCreeps.reserver = 1;
      numberOfCreeps.importerRepairer = 1;
      // numberOfCreeps.attacker = 1;
    } else if (roomName === 'W3S19') {
      // numberOfCreeps.importerHarvester = 2;
    } else if (roomName === 'W4S18') {
      // numberOfCreeps.importerHarvester = 2;
    } else if (roomName === 'W5S18') {
      // numberOfCreeps.importerHarvester = 2;
    } else if (roomName === 'W1S15') {
      numberOfCreeps.attacker = 0;
    } else if (roomName === 'W2S16') {
      numberOfCreeps.importerHarvester = 3;
      numberOfCreeps.reserver = 1;
      numberOfCreeps.importerRepairer = 1;
      // numberOfCreeps.attacker = 1;
    }

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
  },
  getRoles: function () {
    return {
      harvester: require('role.harvester'),
      builder: require('role.builder'),
      repairer: require('role.repairer'),
      upgrader: require('role.upgrader'),
      longDistanceHarvester: require('role.longDistanceHarvester'),
      claimer: require('role.claimer'),
      signer: require('role.signer'),
      reserver: require('role.reserver'),
      wallRepairer: require('role.wallRepairer'),
      mineralHarvester: require('role.mineralHarvester'),
      linkHarvester: require('role.linkHarvester'),
      linkUpgrader: require('role.linkUpgrader'),
      secondHarvester: require('role.secondHarvester'),
      attacker: require('role.attacker'),
      attackerRange: require('role.attackerRange'),
      importerHarvester: require('role.importerHarvester'),
      importerRepairer: require('role.importerRepairer'),
    };
  },
  getRolesArray: function () {
    return [
      'harvester',
      'builder',
      'repairer',
      'upgrader',
      'longDistanceHarvester',
      'wallRepairer',
      'mineralHarvester',
      'linkHarvester',
      'linkUpgrader',
      'secondHarvester',
      'attacker',
      'attackerRange',
      'importerHarvester',
      'reserver',
      'importerRepairer'
    ];
  },
  getBuildingByFlagColor: function (flag) {
    let structure = '';
    if (flag.color === 9) {
      structure = STRUCTURE_ROAD // grey flag
    } else if (flag.color === 6) {
      structure = STRUCTURE_EXTENSION // yellow flag
    } else if (flag.color === 1) {
      structure = STRUCTURE_TOWER // red flag
    } else if (flag.color === 2) {
      structure = STRUCTURE_EXTRACTOR // purple flag
    } else if (flag.color === 3) {
      structure = STRUCTURE_LINK // blue flag
    }
    return structure;
  }
};

module.exports = config;
