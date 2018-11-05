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

    //if (energy >= 2300) {
    //    body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
    //}

    if (role === 'attacker') {
      // 1800 energy
      body = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK, MOVE, MOVE, ATTACK]
    }

    if (role === 'attackerRange') {
      // 2360 energy
      body = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK, MOVE, MOVE, RANGED_ATTACK]
    }

    if (role === 'reserver') {
      body = [MOVE, MOVE, CLAIM, CLAIM];
    }

    if (role === 'importerRepairer') {
      body = [MOVE, MOVE, WORK, CARRY, CARRY];
    }

    return body;
  }
};
