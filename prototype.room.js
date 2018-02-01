const config = require('config');

Room.prototype.buildStructuresOnFlags = function (enabled) {
    if (!enabled) {
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
        log += '[' + this.name + ': (lvl: ' + this.controller.level + ')(xp: ' + Number.parseFloat(this.controller.progress * 100 / this.controller.progressTotal).toPrecision(3) + '%)(ene: ' + this.energyAvailable + '/' + this.energyCapacityAvailable + ')]';

        creeps.map(c => {
                if (c.number) {
                    log += '(' + c.role + ':' + c.number + ')'
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
}