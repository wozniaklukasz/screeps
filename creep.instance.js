"use strict";

var creepInstance = {
    get: function (creep) {
        var creepTmp = {
            id: creep.id,
            memory: creep.memory,
            body: creep.body,
            name: creep.name,
            carry: creep.carry,
            carryCapacity: creep.carryCapacity
        };
        return creepTmp;
    }
};

module.exports = creepInstance;