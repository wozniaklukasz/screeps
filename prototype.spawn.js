const config = require('config');
const utilsSpawn = require('utils.spawn');

StructureSpawn.prototype.spawnCreepsIfNecessary =
    function () {
        let room = this.room;
        let numberOfCreepsLiving = room.getNumberOfCreepsByRoomName();
        let numberOfCreepsToDo = config.getNumberOfCreepsToDo(room.name);

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
                            targetRoom: 'E29S27',
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
