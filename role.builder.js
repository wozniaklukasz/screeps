const roleUpgrader = require('role.upgrader');

module.exports = {
    run: function (creep) {
        creep.isCreepAbleToWork();

        if (creep.memory.working) {

            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

            if (constructionSite) {
                if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
        else {
            creep.getEnergy(true, true);
        }
    }
};