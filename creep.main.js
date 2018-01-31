"use strict";

const EnumRoles = require('enum.roles');

let creepMain = {
    infoLog: function (creeps) {
        var creepsTmp = '';

        for (var item in EnumRoles) {
            var filteredCreeps = creeps.filter(function (creep) {
                return creep.memory.role === EnumRoles[item]
            });
            creepsTmp += '(' + EnumRoles[item] + ' ' + filteredCreeps.length;

            creepsTmp += ')';
        }

        return '[Creeps: ' + creepsTmp + ']';
    }
};

module.exports = creepMain;