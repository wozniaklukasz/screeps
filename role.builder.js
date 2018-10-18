/*
Builder doesn't build walls and ramparts.
*/

const roleUpgrader = require('role.upgrader');

module.exports = {
    run: function (creep) {
        creep.isCreepAbleToWork();

        if (creep.memory.working) {

            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
              filter: (s) => s.structureType !== STRUCTURE_WALL || s.structureType !== STRUCTURE_RAMPART
            });

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
