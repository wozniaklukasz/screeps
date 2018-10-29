const config = require('config');
const utilsSpawn = require('utils.spawn');

StructureSpawn.prototype.spawnCreepsIfNecessary =
  function () {
    let room = this.room;

    let numberOfCreepsLiving = room.getNumberOfCreepsByRoomName();
    let numberOfCreepsToDo = config.getNumberOfCreepsToDo(room);

    numberOfCreepsLiving.forEach(creepsLiving => {
      let role = creepsLiving.role;

      if (creepsLiving.number < numberOfCreepsToDo[role]) {
        let name = role + Game.time;
        let energy = room.energyCapacityAvailable;
        let body = utilsSpawn.getSpawnedCreepBody(energy, role);

        this.spawnCreep(body, name,
          {
            memory: {
              role: role,
              secondRole: null,
              homeRoom: room.name,
              targetRoom: 'W4S18',
              working: false
            }
          });
      }
    });

    let numberOfHarvesters = numberOfCreepsLiving.filter(creep => creep.role === 'harvester').map(creep => creep.number);

    if (numberOfHarvesters < 1) {
      console.log('*** Harvesters alert - room: ' + this.room.name + '!');
      this.room.memory.noHarvestersAlert = true;
    } else {
      this.room.memory.noHarvestersAlert = false;
    }

    if (config.booleans.enableConsoleLog && room.controller && room.controller.my) {
      let log = '';
      let storageInfo = '';

      if (config.booleans.storageAmountLog && !_.isEmpty(room.storage)) {
        storageInfo += '[Storage: ';
        const storageStore = room.storage.store;
        for (let mineral in storageStore) {
          storageInfo += '(' + mineral + ': ' + storageStore[mineral] + ')';
        }
        storageInfo += ']';
      }

      log += '[' + room.name + ': (lvl: ' + room.controller.level + ')(xp: ' + Number.parseFloat(room.controller.progress * 100 / room.controller.progressTotal).toPrecision(3) + '%)(ene: ' + room.energyAvailable + '/' + room.energyCapacityAvailable + ')][Creeps: ';

      numberOfCreepsLiving.map(c => {
          if (numberOfCreepsToDo[c.role]) {
            log += '(' + c.role + ':' + c.number + '/' + numberOfCreepsToDo[c.role] + ')'
          }
        }
      );
      log += ']' + storageInfo;
      console.log(log);
    }
  };

StructureSpawn.prototype.spawningInfo =
  function () {
    if (this.spawning) {
      let spawningCreep = Game.creeps[this.spawning.name];
      this.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        this.pos.x + 1,
        this.pos.y,
        {align: 'left', opacity: 0.8});
    }
  };
