const config = {
    booleans: {
        enableConsoleLog: true,
        enableBuildingByFlagsColors: false
    },
    getRoles: function () {
        return {
            harvester: require('role.harvester'),
            upgrader: require('role.upgrader'),
            builder: require('role.builder'),
            repairer: require('role.repairer'),
            longDistanceHarvester: require('role.longDistanceHarvester'),
            claimer: require('role.claimer'),
        };
    },
    getBuildingByFlagColor: function (flag) {
        let structure = '';
        if (flag.color === 10) {
            structure = STRUCTURE_ROAD // white flag
        } else if (flag.color === 6) {
            structure = STRUCTURE_EXTENSION // yellow flag
        } else if (flag.color === 1) {
            structure = STRUCTURE_TOWER // red flag
        }
        return structure;
    }
};

module.exports = config;