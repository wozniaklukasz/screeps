"use strict";

var creepInstance = require('creep.instance');
var EnumRoles = require('enum.roles');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

var creepMain = {
    getCreeps: function (creeps) {
        var creepsTmp = [];
        creeps.forEach(function (creep) {
            creepsTmp.push(creepInstance.get(creep));
        });

        return creepsTmp;
    },

    spawnCreep: function () {
    },

    setCreepsRole: function (room, creeps) {
        creeps.forEach(function (creep) {
            console.log(creep);
            console.log(room);

            /**************************************/
            var targets = room.constructions;

            // harvester -> builder -> upgrader
            if (creep.memory.role === EnumRoles.Harvester) {
                if(room.energyAvailable !== room.energyCapacityAvailable) {
                    roleHarvester.run(creep);
                } else {
                    targets ? roleBuilder.run(creep) : roleUpgrader.run(creep);
                }
            }
            // builder -> upgrader
            if(creep.memory.role === EnumRoles.Builder) {
                targets ? roleBuilder.run(creep) : roleUpgrader.run(creep);
            }
            // upgrader
            if(creep.memory.role === EnumRoles.Upgrader) {
                roleUpgrader.run(creep);
            }
        })
    },

    infoLog: function (creeps) {
        var creepsTmp = '';

        for (var item in EnumRoles) {
            var filteredCreeps = creeps.filter(function (creep) {
                return creep.memory.role === EnumRoles[item]
            });
            creepsTmp += '(' + EnumRoles[item] + ' x' + filteredCreeps.length + ' body:';
            filteredCreeps.forEach(function (creep) {
                creepsTmp += ' ' + creep.body.length
            });
            creepsTmp += ')';
        }

        return '[Creeps: ' + creepsTmp + ']';
    }
};

module.exports = creepMain;