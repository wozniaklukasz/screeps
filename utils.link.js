module.exports = {
  linksTransfers: function () {
    for (let room in Game.rooms) {
      //Game.rooms[room].buildStructuresOnFlags();

      const tmpRoom = Game.rooms[room];

      switch (tmpRoom.name) {
        case "W2S19":
          const linkSource = tmpRoom.lookForAt('structure', 37, 44)[0];
          const linkController = tmpRoom.lookForAt('structure', 18, 9)[0];
          linkSource.transferEnergy(linkController);
          tmpRoom.memory.linkSource = linkSource;
          tmpRoom.memory.linkController = linkController;
          break;
        case "W5S18":
          // todo: refactor code
          const linkSource2 = tmpRoom.lookForAt('structure', 33, 21)[0];
          const linkController2 = tmpRoom.lookForAt('structure', 17, 43)[0];
          linkSource2.transferEnergy(linkController2);
          tmpRoom.memory.linkSource = linkSource2;
          tmpRoom.memory.linkController = linkController2;
          break;
      case "W1S15":
          // todo: refactor code
          const linkSource3 = tmpRoom.lookForAt('structure', 14, 23)[0];
          const linkController3 = tmpRoom.lookForAt('structure', 36, 14)[0];
          linkSource3.transferEnergy(linkController3);
          tmpRoom.memory.linkSource = linkSource3;
          tmpRoom.memory.linkController = linkController3;
          break;
        case "W3S19":
          const linkSource4 = tmpRoom.lookForAt('structure', 7, 44)[0];
          const linkController4 = tmpRoom.lookForAt('structure', 34, 19)[0];
          linkSource4.transferEnergy(linkController4);
          tmpRoom.memory.linkSource = linkSource4;
          tmpRoom.memory.linkController = linkController4;
          break;
      }
    }

    function test() {
      // console.log(1)
    }
  }
};
