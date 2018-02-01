/*

Game.spawns['Thor'].spawnCreep( [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], 'harvester844848',
    { memory: { role: 'harvester', targetRoom: "E28S28", working: false } } );

    
Game.spawns['Spawn1'].room.controller.activateSafeMode();

Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );


Game.creeps['Harvester1'].suicide()

Game.rooms["E32S12"].createConstructionSite(30, 36, STRUCTURE_ROAD);


if(creep.room.controller) {
    if(creep.signController(creep.room.controller, "I'm going to claim this room in a few days. I warned ya!") == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}

Game.creeps['builder2939663'].claimController(Game.rooms.controller);


function extensionMaintance() {
    var pos = [
        {x: 13, y: 24},
        {x: 12, y: 23},
        {x: 13, y: 22},
        {x: 14, y: 21},
        {x: 12, y: 22},
        {x: 13, y: 21}
    ];
    pos.map((pos) => Game.rooms["E28S28"].createConstructionSite(pos.x, pos.y, STRUCTURE_EXTENSION));
}

 */
