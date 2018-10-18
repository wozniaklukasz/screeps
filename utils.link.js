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
        case "W63S28":
          // todo: refactor code
          const linkSource2 = tmpRoom.lookForAt('structure', 47, 25)[0];
          const linkController2 = tmpRoom.lookForAt('structure', 37, 11)[0];
          linkSource2.transferEnergy(linkController2);
          tmpRoom.memory.linkSource = linkSource2;
          tmpRoom.memory.linkController = linkController2;
          break;
      }
    }

    function test() {
      // console.log(1)
    }
  }
};
