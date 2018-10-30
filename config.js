const config = {
  booleans: {
    enableConsoleLog: true,
    storageAmountLog: true,
    enableBuildingByFlagsColors: false,
    enableCpuLog: true
  },
  getNumberOfCreepsToDo: function (room) {
    const roomName = room.name;
    let numberOfCreeps = {};

    if (roomName === 'W2S19') {
      numberOfCreeps.harvester = 1;
      numberOfCreeps.linkHarvester = 1;
      numberOfCreeps.linkUpgrader = 1;
      numberOfCreeps.importerHarvester = 2;
    } else if (roomName === 'W3S19') {
      numberOfCreeps.harvester = 1;
      numberOfCreeps.linkHarvester = 1;
      numberOfCreeps.linkUpgrader = 1;
    } else if (roomName === 'W4S18') {
      numberOfCreeps.harvester = 1;
      numberOfCreeps.linkHarvester = 1;
      numberOfCreeps.linkUpgrader = 1;
      numberOfCreeps.importerHarvester = 2;
    } else if (roomName === 'W5S18') {
      numberOfCreeps.harvester = 1;
      numberOfCreeps.linkHarvester = 1;
      numberOfCreeps.linkUpgrader = 1;
    } else if (roomName === 'W1S15') {
      numberOfCreeps.harvester = 1;
      numberOfCreeps.linkHarvester = 1;
      numberOfCreeps.linkUpgrader = 1;
    } else if (roomName === 'W2S16') {
      numberOfCreeps.harvester = 1;
      numberOfCreeps.linkHarvester = 1;
      numberOfCreeps.linkUpgrader = 1;
      numberOfCreeps.importerHarvester = 2;
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
    if (!_.isEmpty(extractor) && mineralAmount > 0 && mineralStored < 100000) {
      numberOfCreeps.mineralHarvester = 1
    }

    // const links = _.filter(myStructures, s => s.structureType === STRUCTURE_LINK);
    // if (links.length === 2) {
    //   // todo: spawn linkers? add condition if id in memory
    // }

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
      wallRepairer: require('role.wallRepairer'),
      mineralHarvester: require('role.mineralHarvester'),
      linkHarvester: require('role.linkHarvester'),
      linkUpgrader: require('role.linkUpgrader'),
      secondHarvester: require('role.secondHarvester'),
      attacker: require('role.attacker'),
      attackerRange: require('role.attackerRange'),
      importerHarvester: require('role.importerHarvester'),
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
      'importerHarvester'
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
