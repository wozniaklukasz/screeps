module.exports = {
    run: function(creep) {
        creep.isCreepAbleToWork();

        if (creep.memory.working) {

            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            creep.getEnergy(true, true);
        }
    }
};