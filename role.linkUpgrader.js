module.exports = {
    run: function(creep) {
        creep.isCreepAbleToWork();
console.log(creep)
        if (creep.memory.working) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            //todo: change link logic
            let link = Game.getObjectById(creep.room.memory.linkController.id);
            if(creep.withdraw(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(link);
            };
        }
    }
};