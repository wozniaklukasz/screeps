module.exports = {
  linksTransfers: function () {
    for (let room in Game.rooms) {
      const tmpRoom = Game.rooms[room];

      setLinkConnection(tmpRoom, "W2S19", 37, 44, 18, 9);
      setLinkConnection(tmpRoom, "W5S18", 33, 21, 17, 43);
      setLinkConnection(tmpRoom, "W1S15", 14, 23, 36, 14);
      setLinkConnection(tmpRoom, "W3S19", 7, 44, 34, 19);
      setLinkConnection(tmpRoom, "W2S16", 12, 24, 42, 19);
      setLinkConnection(tmpRoom, "W4S18", 35, 37, 13, 11);
    }

    function setLinkConnection(tmpRoom, roomName, sourceX, sourceY, controllerX, controllerY) {
      if (tmpRoom.name === roomName) {
        const linkSource = tmpRoom.lookForAt('structure', sourceX, sourceY)[0];
        const linkController = tmpRoom.lookForAt('structure', controllerX, controllerY)[0];
        linkSource.transferEnergy(linkController);
        tmpRoom.memory.linkSourceId = linkSource.id;
        tmpRoom.memory.linkControllerId = linkController.id;
      }
    }
  }
};
