module.exports = {
    getSpawnedCreepBody: function (energy, role) {
        let body = [WORK, WORK, CARRY, MOVE];

        if (energy >= 550) {
            body = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
        }
        if (energy >= 800) {
            body = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        }
        if (energy >= 1300) {
            body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        }
        if (energy >= 1800) {
            body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        }

        if (role === 'repairer' && energy >= 1000) {
            body = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        }

        return body;
    }

};
