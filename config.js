const config = {
  booleans: {
    enableConsoleLog: true,
    enableBuildingByFlagsColors: false,
    enableCpuLog: true
  },
  getNumberOfCreepsToDo: function (roomName) {
    let numberOfCreeps = {
      harvester: 4
    };
    if (roomName === 'W2S19') {
      numberOfCreeps = {
        harvester: 1,
        builder: 0,
        upgrader: 0,
        repairer: 0,
        longDistanceHarvester: 0,
        wallRepairer: 0,
        mineralHarvester: 0,
        linkHarvester: 1,
        linkUpgrader: 1,
        secondHarvester: 0,
        attacker: 0
      };
    } else if (roomName === 'W3S19') {
      numberOfCreeps = {
        harvester: 1,
        builder: 0,
        upgrader: 0,
        repairer: 0,
        longDistanceHarvester: 1,
        mineralHarvester: 0,
        linkHarvester: 1,
        linkUpgrader: 1,
        secondHarvester: 0
      };
    } else if (roomName === 'W4S18') {
      numberOfCreeps = {
        harvester: 2,
        upgrader: 1,
        wallRepairer: 0,
      };
    } else if (roomName === 'W5S18') {
      numberOfCreeps = {
        harvester: 1,
        upgrader: 0,
        longDistanceHarvester: 0,
        linkHarvester: 1,
        linkUpgrader: 1,
        wallRepairer: 0,
        builder: 0
      };
    } else if (roomName === 'W1S15') {
      numberOfCreeps = {
        harvester: 1,
        linkHarvester: 1,
        linkUpgrader: 1,
        upgrader: 0,
        attacker: 0,
        wallRepairer: 0,
      };
    } else if (roomName === 'W2S16') {
      numberOfCreeps = {
        harvester: 2,
        upgrader: 1,
        wallRepairer: 0,
        builder: 0,
      };
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
      wallRepairer: require('role.wallRepairer'),
      mineralHarvester: require('role.mineralHarvester'),
      linkHarvester: require('role.linkHarvester'),
      linkUpgrader: require('role.linkUpgrader'),
      secondHarvester: require('role.secondHarvester'),
      attacker: require('role.attacker')
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
      'attacker'
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
