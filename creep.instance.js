"use strict";
const EnumRoles = require('enum.roles');

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
    },
    getEnergy: function (creep, useContainer, useSource) {
            let container;
            if (useContainer) {
                container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) &&
                    s.store[RESOURCE_ENERGY] > 0
            });
                if (!container) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
            }
            if (!container && useSource) {
                let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }},
    showCreepRole: function (creep) {
        let text = '';
        if (creep.memory.role === EnumRoles.Harvester) {
            text = '♻';
        } else if (creep.memory.role === EnumRoles.Builder) {
            text = '🚧';
        } else if (creep.memory.role === EnumRoles.Upgrader) {
            text = '🗲';
        } else if (creep.memory.role === EnumRoles.Repairer) {
            text = '⚒';
        } else if (creep.memory.role === EnumRoles.LongDistanceHarvester) {
            text = '🚀';
        }
            creep.room.visual.text(
            text,
            creep.pos.x + .4,
            creep.pos.y,
            {align: 'left', opacity: 0.8})
    }
};

module.exports = creepInstance;
