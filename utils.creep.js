const utilsCreep = {
  changeRoleToSymbol: function (role) {
    if (role === 'harvester') {
      return '♻️';
    } else if (role === 'builder') {
      return '⚙️'
    } else if (role === 'upgrader') {
      return '⚡';
    } else if (role === 'repairer') {
      return '🛠️';
    } else if (role === 'longDistanceHarvester') {
      return '🔻';
    } else if (role === 'wallRepairer') {
      return '🛡️'
    } else if (role === 'mineralHarvester') {
      return '⛏️'
    } else if (role === 'linkHarvester') {
      return '🔷'
    } else if (role === 'linkUpgrader') {
      return '🔶'
    } else if (role === 'attacker') {
      return '⚔️'
    } else if (role === 'importerHarvester') {
      return '☀️'
    } else if (role === 'attackerRange') {
      return '🏹'
    }
    return role;
  }
};

module.exports = utilsCreep;
