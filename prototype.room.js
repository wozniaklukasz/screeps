const config = require('config');

Room.prototype.buildStructuresOnFlags = function () {
    if (!config.booleans.enableBuildingByFlagsColors) {
        return;
    }

    this.find(FIND_FLAGS).map(f => {
        let structure = config.getBuildingByFlagColor(f);
        if (structure) {
            this.createConstructionSite(f.pos.x, f.pos.y, structure);
        }
    })
};

Room.prototype.logPopulation = function () {
    if (config.booleans.enableConsoleLog && this.controller.my) {
        let log = '';
        let creeps = this.getNumberOfCreepsByRoomName(this.name);
        let requiredCreeps = config.getNumberOfCreepsToDo(this.name);

        log += '[' + this.name + ': (lvl: ' + this.controller.level + ')(xp: ' + Number.parseFloat(this.controller.progress * 100 / this.controller.progressTotal).toPrecision(3) + '%)(ene: ' + this.energyAvailable + '/' + this.energyCapacityAvailable + ')]';

        creeps.map(c => {
                if (requiredCreeps[c.role]) {
                    log += '(' + c.role + ':' + c.number + '/' + requiredCreeps[c.role] + ')'
                }
            }
        );
        console.log(log);
    }
};

Room.prototype.getNumberOfCreepsByRoomName = function () {
    let roleCounter = [];
    config.getRolesArray().map(role => {
        roleCounter.push({
            role: role,
            number: _(Memory.creeps).filter({role: role, homeRoom: this.name}).size()
        });
    });
    return roleCounter;
};
