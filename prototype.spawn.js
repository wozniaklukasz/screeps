const config = require('config');

StructureSpawn.prototype.spawnCreepsIfNecessary =
    function () {
        let room = this.room;
        let numberOfCreepsLiving = room.getNumberOfCreepsByRoomName();
        let numberOfCreepsToDo = config.getNumberOfCreepsToDo(room.name);

        numberOfCreepsLiving.forEach(creepsLiving => {
            let role = creepsLiving.role;

            if (creepsLiving.number < numberOfCreepsToDo[role]) {
                let name = role + Game.time;
                let body = [WORK, WORK, CARRY, MOVE];
                let energy = room.energyCapacityAvailable;

                if (energy >= 550) {
                    body = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
                }
                if (energy >= 800) {
                    body = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
                }
                if (energy >= 1300) {
                    body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
                }
                if (energy >= 1800) {
                    body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
                }

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
