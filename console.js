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
 */
