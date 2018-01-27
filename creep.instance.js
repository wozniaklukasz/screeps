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
            /** @type {StructureContainer} */
            let container;
            // if the Creep should look for containers
            if (useContainer) {
                // find closest container
                container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                    s.store[RESOURCE_ENERGY] > 0
            });
                // if one was found
                if (container != undefined) {
                    // try to withdraw energy, if the container is not in range
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(container);
                    }
                }
            }
            // if no container was found and the Creep should look for Sources
            if (container == undefined && useSource) {
                // find closest source
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

                // try to harvest energy, if the source is not in range
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards it
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
