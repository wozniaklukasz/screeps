const config = {
  constans: {
    RAMPART_MAX_HITS: 100000,
    WALL_MAX_HITS: 1000000,
    STORAGE_ENERGY: 500000,
    STORAGE_MINERAL: 40000
  },
  booleans: {
    enableBuildingByFlagsColors: true,
    enableConsoleLog: true,
    storageAmountLog: true,
    enableCpuLog: true,
    enableFlagsLog: true,
    autoBuildRamparts: true
  },
  getNumberOfCreepsToDo: function (numberOfCreeps, room) {
    const roomName = room.name;

    if (roomName === 'W2S19') {
    } else if (roomName === 'W3S19') {
      // numberOfCreeps.harvester = 2;
    //   numberOfCreeps.linkHarvester = 0;
    //   numberOfCreeps.harvester = 2;
    //   numberOfCreeps.linkUpgrader = 0;
    //   numberOfCreeps.builder = 2;
    //   numberOfCreeps.wallRepairer = 1;
    } else if (roomName === 'W4S18') {
      // numberOfCreeps.linkHarvester = 0;
    //   numberOfCreeps.attacker = 0;
    //numberOfCreeps.wallRepairer = 1;
    //numberOfCreeps.upgrader = 1;
    } else if (roomName === 'W5S18') {
       //numberOfCreeps.importerReserver = 1;
        //numberOfCreeps.attacker = 1;
        //numberOfCreeps.wallRepairer = 1;
        //numberOfCreeps.attackerPowerBank = 4;
    } else if (roomName === 'W1S15') {
      // numberOfCreeps.attackerPowerBank = 2;
    //   numberOfCreeps.attacker = 1;
      // numberOfCreeps.exportHarvester = 2;
      // // numberOfCreeps.builder = 2
    //   numberOfCreeps.linkHarvester = 0;
    //   numberOfCreeps.harvester = 2;
    //   numberOfCreeps.linkUpgrader = 0;
    //   numberOfCreeps.builder = 2;
      //numberOfCreeps.upgrader = 1;
      //numberOfCreeps.wallRepairer = 1;
    } else if (roomName === 'W2S16') {
    //   numberOfCreeps.linkHarvester = 0;
    //   numberOfCreeps.harvester = 2;
    //   numberOfCreeps.linkUpgrader = 0;
    //   numberOfCreeps.upgrader = 1;
    //   numberOfCreeps.wallRepairer = 1;
    } else if (roomName === 'W1S13') {
      //   numberOfCreeps.harvester = 1;
      //   numberOfCreeps.exportHarvester = 3;
      //numberOfCreeps.builder = 2;
            //numberOfCreeps.wallRepairer = 1;
            numberOfCreeps.upgrader = 1;
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
      attackerPowerBank: require('role.attackerPowerBank'),
    };
  },
  getBuildingByFlagColor: function (flag) {
    let structure = '';
    if (flag.color === 6) {
      structure = STRUCTURE_EXTENSION // yellow flag
    } else if (flag.color === 1) {
      structure = STRUCTURE_TOWER // red flag
    } else if (flag.color === 2) {
      structure = STRUCTURE_LINK // purple flag
    } else if (flag.color === 3) {
      structure = STRUCTURE_SPAWN // blue flag
    } else if (flag.color === 7) {
      structure = STRUCTURE_EXTRACTOR // orange flag
    }
    return structure;
  },
  getLinkConnections: function (roomName) {
    if (roomName === "W2S19") {
      return {
        linkSource: {x: 37, y: 44},
        linkController: {x: 18, y: 9}
      }
    } else if (roomName === "W5S18") {
      return {
        linkSource: {x: 33, y: 21},
        linkController: {x: 17, y: 43}
      }
    } else if (roomName === "W1S15") {
      return {
        linkSource: {x: 14, y: 23},
        linkController: {x: 36, y: 14}
      }
    } else if (roomName === "W3S19") {
      return {
        linkSource: {x: 7, y: 44},
        linkController: {x: 34, y: 19}
      }
    } else if (roomName === "W2S16") {
      return {
        linkSource: {x: 12, y: 24},
        linkController: {x: 42, y: 19}
      }
    } else if (roomName === "W4S18") {
      return {
        linkSource: {x: 35, y: 37},
        linkController: {x: 13, y: 11}
      }
    } else if (roomName === "W1S13") {
      return {
        linkSource: {x: 3, y: 23},
        linkController: {x: 25, y: 6}
      }
    }
    // const linkSource = tmpRoom.lookForAt('structure', sourceX, sourceY)[0];
    // const linkController = tmpRoom.lookForAt('structure', controllerX, controllerY)[0];
    // if (linkSource && linkController) {
    //   linkSource.transferEnergy(linkController);
    //   tmpRoom.memory.linkSourceId = linkSource.id;
    //   tmpRoom.memory.linkControllerId = linkController.id;
    // } else {
    //   tmpRoom.memory.linkSourceId = null;
    //   tmpRoom.memory.linkControllerId = null;
    // }
  }
};

module.exports = config;
