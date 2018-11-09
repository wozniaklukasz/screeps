const config = {
  constans: {
    RAMPART_MAX_HITS: 50000
  },
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
      // numberOfCreeps.importerHarvester = 2;
      // numberOfCreeps.importerRepairer = 1;
      // numberOfCreeps.reserver = 1;
      // numberOfCreeps.attacker = 1;
    } else if (roomName === 'W3S19') {
      // numberOfCreeps.harvester = 2;
    } else if (roomName === 'W4S18') {
      // numberOfCreeps.linkHarvester = 0;
    } else if (roomName === 'W5S18') {
      // numberOfCreeps.importerHarvester = 2;
    } else if (roomName === 'W1S15') {
      // numberOfCreeps.attacker = 1;
      numberOfCreeps.exportHarvester = 2;
    } else if (roomName === 'W2S16') {
      numberOfCreeps.importerHarvester = 3;
      numberOfCreeps.importerRepairer = 1;
      numberOfCreeps.importerReserver = 1;
    } else if (roomName === 'W1S13') {
      numberOfCreeps.harvester = 1;
      numberOfCreeps.upgrader = 0;
    }
    return numberOfCreeps;
  },
  getRoles: function () {
    return {
      repairer: require('role.repairer'),
      rampartRepairer: require('role.rampartRepairer'),
      exportHarvester: require('role.exportHarvester'),
      claimer: require('role.claimer'),
      signer: require('role.signer'),
      wallRepairer: require('role.wallRepairer'),
      attackerRange: require('role.attackerRange'),
      importerReserver: require('role.importerReserver'),
      importerRepairer: require('role.importerRepairer'),
      importerHarvester: require('role.importerHarvester'),
      mineralHarvester: require('role.mineralHarvester'),
      attacker: require('role.attacker'),
      builder: require('role.builder'),
      upgrader: require('role.upgrader'),
      linkUpgrader: require('role.linkUpgrader'),
      linkHarvester: require('role.linkHarvester'),
      harvester: require('role.harvester'),
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
