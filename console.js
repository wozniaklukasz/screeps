/*

Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1',
    { memory: { role: 'harvester' } } );

Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1',
    { memory: { role: 'upgrader' } } );

Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1',
    { memory: { role: 'builder' } } );

// 550 energy:
Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
    'HarvesterBig',
    { memory: { role: 'harvester' } } );
    
    
Game.spawns['Spawn1'].room.controller.activateSafeMode();
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );


Game.creeps['Harvester1'].suicide()

Game.rooms["E32S12"].createConstructionSite(30, 36, STRUCTURE_ROAD);


if(creep.room.controller) {
    if(creep.signController(creep.room.controller, "I'm going to claim this room in a few days. I warned ya!") == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
}
 */
