const config = {
  booleans: {
    enableBuildingByFlagsColors: false,
    enableConsoleLog: true,
    storageAmountLog: true,
    enableCpuLog: true,
    enableFlagsLog: true,
  },
  getNumberOfCreepsToDo: function (numberOfCreeps, room) {
    const roomName = room.name;

    if (roomName === 'W2S19') {
      numberOfCreeps.importerHarvester = 2;
      numberOfCreeps.reserver = 1;
      numberOfCreeps.importerRepairer = 1;
      // numberOfCreeps.attacker = 1;
    } else if (roomName === 'W3S19') {
      // numberOfCreeps.harvester = 2;
    } else if (roomName === 'W4S18') {
      // numberOfCreeps.importerHarvester = 2;
    } else if (roomName === 'W5S18') {
      // numberOfCreeps.importerHarvester = 2;
    } else if (roomName === 'W1S15') {
      // numberOfCreeps.attacker = 1;
    } else if (roomName === 'W2S16') {
      numberOfCreeps.importerHarvester = 3;
      numberOfCreeps.reserver = 1;
      numberOfCreeps.importerRepairer = 1;
      // numberOfCreeps.attacker = 1;
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
      structure = STRUCTURE_SPAWN // blue flag
    }
    return structure;
  }
};

module.exports = config;
