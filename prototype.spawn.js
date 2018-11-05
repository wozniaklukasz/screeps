const config = require('config');
const logs = require('logs');
const utilsSpawn = require('utils.spawn');
const creeps = require('game.creeps');

StructureSpawn.prototype.spawnCreepsIfNecessary =
  function () {
    let room = this.room;

    let numberOfCreepsLiving = room.getNumberOfCreepsByRoomName();
    let numberOfCreepsToDo = config.getNumberOfCreepsToDo(room);

    let numberOfHarvesters = numberOfCreepsLiving.filter(creep => creep.role === 'harvester').map(creep => creep.number);

    if (numberOfHarvesters < 1) {
      if (config.booleans.enableConsoleLog) {
        console.log('*** Harvesters alert - room: ' + this.room.name + '!');
      }
      this.room.memory.noHarvestersAlert = true;
    } else {
      this.room.memory.noHarvestersAlert = false;
    }

    numberOfCreepsLiving.forEach(creepsLiving => {
      let role = creepsLiving.role;
// console.log(parseInt(room.energyAvailable / 200))
      if (creepsLiving.number < numberOfCreepsToDo[role]) {
        let name = role + Game.time;
        let energy = room.energyCapacityAvailable;
        let body = utilsSpawn.getSpawnedCreepBody(energy, role);

        this.spawnCreep(body, name,
          {
            memory: {
              role: role,
              homeRoom: room.name,
              working: false
            }
          });

        if (creepsLiving.number === 0 && role === 'harvester') {
          const bodyParts = parseInt(room.energyAvailable / 200)

          let bodyH = [];

          for (let i = 0; i < bodyParts; i++) {
            bodyH.push(WORK);
            bodyH.push(MOVE);
            bodyH.push(CARRY);
          }

          this.spawnCreep(bodyH, name,
            {
              memory: {
                role: 'harvester',
                homeRoom: room.name,
                working: false
              }
            })
        }

      }
    });

    logs.logCreepsInfo(room, numberOfCreepsLiving, numberOfCreepsToDo);
  };

StructureSpawn.prototype.spawningInfo =
  function () {
    if (this.spawning) {
      const gCreeps = creeps.getCreeps();

      let spawningCreep = gCreeps[this.spawning.name];
      this.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        this.pos.x + 1,
        this.pos.y,
        {align: 'left', opacity: 0.8});
    }
  };

