const config = require('config');

Room.prototype.buildStructuresOnFlags = function (enabled) {
    if (!enabled) {
        return;
    }

    this.find(FIND_FLAGS).map(f => {
        let structure = config.getBuildingByFlagColor(f);
        if (structure) {
            console.log(structure)
            this.createConstructionSite(f.pos.x, f.pos.y, structure);
        }
    })
};
