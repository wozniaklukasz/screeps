"use strict";

const EnumRoles = require('enum.roles');
const roleHarvester = require('role.harvester');
const roleLongDistanceHarvester = require('role.longDistanceHarvester');
const roleBuilder = require('role.builder');
const roleUpgrader = require('role.upgrader');
const roleRepairer = require('role.repairer');

let creepMain = {
    setCreepsRole: function (room, creeps) {
        creeps.forEach(function (creep) {
            //todo: FIND_CONSTRUCTION_SITES / FIND_MY_CONSTRUCTION_SITES
            var targets = room.find(FIND_CONSTRUCTION_SITES);
            // harvester -> builder -> upgrader
            if (creep.memory.role === EnumRoles.Harvester) {
                if(room.energyAvailable !== room.energyCapacityAvailable) {
                    roleHarvester.run(creep);
                } else {
                    targets.length ? roleBuilder.run(creep) : roleUpgrader.run(creep);
                }
            }
            // builder -> upgrader
            if(creep.memory.role === EnumRoles.Builder) {
                targets.length ? roleBuilder.run(creep) : roleUpgrader.run(creep);
            }
            // upgrader
            if(creep.memory.role === EnumRoles.Upgrader) {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role === EnumRoles.Repairer) {
                roleRepairer.run(creep);
            }
            if(creep.memory.role === EnumRoles.LongDistanceHarvester) {
                roleLongDistanceHarvester.run(creep);
            }
        })
    },

    infoLog: function (creeps) {
        var creepsTmp = '';

        for (var item in EnumRoles) {
            var filteredCreeps = creeps.filter(function (creep) {
                return creep.memory.role === EnumRoles[item]
            });
            creepsTmp += '(' + EnumRoles[item] + ' ' + filteredCreeps.length;

            // creepsTmp += filteredCreeps.length + ' body:';
            // filteredCreeps.forEach(function (creep) {
            //     creepsTmp += ' ' + creep.body.length
            // });
            creepsTmp += ')';
        }

        return '[Creeps: ' + creepsTmp + ']';
    }
};

module.exports = creepMain;