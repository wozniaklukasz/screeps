const config = {
    booleans: {
        enableConsoleLog: true,
        enableBuildingByFlagsColors: true
    },
    getNumberOfCreepsToDo: function (roomName) {
        let numberOfCreeps = {
            harvester: 4
        };
        if (roomName === 'E28S28') {
            numberOfCreeps = {
                harvester: 2,
                builder: 0,
                upgrader: 1,
                repairer: 1,
                longDistanceHarvester: 0,
                wallRepairer: 2,
                rampartRepairer: 1,
                mineralHarvester: 0
            };
        } else if (roomName === 'E29S28') {
            numberOfCreeps = {
                harvester: 3,
                builder: 1,
                upgrader: 1,
                repairer: 1,
                longDistanceHarvester: 2,
                mineralHarvester: 0
            };
        } else if (roomName === 'E29S27') {
            numberOfCreeps = {
                harvester: 3,
                builder: 0,
                upgrader: 1,
                repairer: 1,
                rampartRepairer: 1,
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
            rampartRepairer: require('role.rampartRepairer')
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
            'mineralHarvester'
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