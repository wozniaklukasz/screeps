const config = {
    booleans: {
        enableConsoleLog: true,
        enableBuildingByFlagsColors: false
    },
    getNumberOfCreepsToDo: function (roomName) {
        let numberOfCreeps = {
            harvester: 4
        };
        if (roomName === 'W64S28') {
            numberOfCreeps = {
                harvester: 1,
                builder: 0,
                upgrader: 0,
                repairer: 0,
                longDistanceHarvester: 0,
                wallRepairer: 0,
                rampartRepairer: 0,
                mineralHarvester: 0,
                linkHarvester: 1,
                linkUpgrader: 1
            };
        } else if (roomName === 'W63S28') {
            numberOfCreeps = {
                harvester: 1,
                builder: 0,
                upgrader: 0,
                repairer: 0,
                longDistanceHarvester: 0,
                mineralHarvester: 0,
                linkHarvester: 1,
                linkUpgrader: 1
            };
        } else if (roomName === 'E29S27') {
            numberOfCreeps = {
                harvester: 3,
                builder: 0,
                upgrader: 1,
                repairer: 1,
                rampartRepairer: 0,
                wallRepairer: 0
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
            rampartRepairer: require('role.rampartRepairer'),
            linkHarvester: require('role.linkHarvester'),
            linkUpgrader: require('role.linkUpgrader')
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
            'rampartRepairer',
            'mineralHarvester',
            'linkHarvester',
            'linkUpgrader'
        ];
    },
    getBuildingByFlagColor: function (flag) {
        let structure = '';
        if (flag.color === 10) {
            structure = STRUCTURE_ROAD // white flag
        } else if (flag.color === 6) {
            structure = STRUCTURE_EXTENSION // yellow flag
        } else if (flag.color === 1) {
            structure = STRUCTURE_TOWER // red flag
        } else if (flag.color === 2) {
            structure = STRUCTURE_EXTRACTOR // purple flag
        }
        return structure;
    }
};

module.exports = config;