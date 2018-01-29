"use strict";

const EnumRoles = require('enum.roles');
const roleHarvester = require('role.harvester');
const roleLongDistanceHarvester = require('role.longDistanceHarvester');
const roleBuilder = require('role.builder');
const roleUpgrader = require('role.upgrader');
const roleRepairer = require('role.repairer');

const roleSigner = require('role.signer');

let creepMain = {
    setCreepsRole: function (room, creeps) {
        creeps.forEach(function (creep) {
            //todo: FIND_CONSTRUCTION_SITES / FIND_MY_CONSTRUCTION_SITES
            if (creep.memory.role === EnumRoles.Harvester) {
                roleHarvester.run(creep);
            } else if(creep.memory.role === EnumRoles.Builder) {
                roleBuilder.run(creep);
            } else if(creep.memory.role === EnumRoles.Upgrader) {
                roleUpgrader.run(creep);
            } else if(creep.memory.role === EnumRoles.Repairer) {
                roleRepairer.run(creep);
            } else if(creep.memory.role === EnumRoles.LongDistanceHarvester) {
                roleLongDistanceHarvester.run(creep);
            } else if(creep.memory.role === 'signer') {
                roleSigner.run(creep);
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