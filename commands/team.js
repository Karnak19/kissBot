const moment = require("moment");
moment.locale("fr");
const raidList = require("../global/raidlist.js");

module.exports = class Team {
  static match(message) {
    return message.content.startsWith("!team");
  }

  static action(message) {
    let args = message.content.split(" ");
    args.shift();
    this.createTeam(message, args);
  }

  static createTeam(message, args) {
    raidList.some(raid => {
      if (raid.label === args[0]) {
        return message.channel.send(raid.name);
      }
    });
  }
};
