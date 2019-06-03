const moment = require("moment");
moment.locale("fr");
const raidList = require("../global/raidlist.js");
const GoogleSpreadsheet = require("google-spreadsheet");
const objectRenameKeys = require("object-rename-keys");

const creds = require("../client_secret.json");
const credentials = require("../google_credentials.js");

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
        const doc = new GoogleSpreadsheet(raid.id);

        doc.useServiceAccountAuth(credentials, function(err) {
          const roster = [];
          const mainTank = [];
          const offTank = [];
          const dd1 = [];
          const dd2 = [];
          const dd3 = [];
          const dd4 = [];
          const dd5 = [];
          const dd6 = [];
          const dd7 = [];
          const dd8 = [];
          const heal1 = [];
          const heal2 = [];
          const keysMap = { 0: "pseudo", 1: "class" };

          doc.getRows(2, function(err, rows) {
            rows.map(row => {
              mainTank.push(row.maintank);
              offTank.push(row.offtank);
              dd1.push(row["dd"]);
              dd2.push(row["dd_2"]);
              dd3.push(row["dd_3"]);
              dd4.push(row["dd_4"]);
              dd5.push(row["dd_5"]);
              dd6.push(row["dd_6"]);
              dd7.push(row["dd_7"]);
              dd8.push(row["dd_8"]);
              heal1.push(row["heal"]);
              heal2.push(row["heal_2"]);
            });

            roster.push(
              mainTank,
              offTank,
              dd1,
              dd2,
              dd3,
              dd4,
              dd5,
              dd6,
              dd7,
              dd8,
              heal1,
              heal2
            );

            const rosterObjects = roster.map(member => {
              let memberObj = { ...member };
              return objectRenameKeys(memberObj, keysMap);
            });

            return message.channel.send({
              embed: {
                author: {
                  name: process.env.botUsername,
                  icon_url:
                    "https://cdn.discordapp.com/app-icons/554966772604993548/a01ce45d641c6e3f8752bc4cbf4cbb6b.png"
                },
                color: 3066993,
                thumbnail: {
                  url:
                    "https://cdn.discordapp.com/app-icons/554966772604993548/a01ce45d641c6e3f8752bc4cbf4cbb6b.png"
                },
                title: `**${raid.name.toUpperCase()} CE SOIR !**`,
                image: {
                  url: raid.image
                },
                fields: [
                  {
                    name: "**⚔ DPS ⚔**",
                    value: `**${rosterObjects[2].pseudo}**, ${
                      rosterObjects[2].class
                    }\n\
                    **${rosterObjects[3].pseudo}**, ${rosterObjects[3].class}\n\
                    **${rosterObjects[4].pseudo}**, ${rosterObjects[4].class}\n\
                    **${rosterObjects[5].pseudo}**, ${rosterObjects[5].class}\n\
                    **${rosterObjects[6].pseudo}**, ${rosterObjects[6].class}\n\
                    **${rosterObjects[7].pseudo}**, ${rosterObjects[7].class}\n\
                    **${rosterObjects[8].pseudo}**, ${rosterObjects[8].class}\n\
                    **${rosterObjects[9].pseudo}**, ${rosterObjects[9].class}`
                  },
                  { name: "\u200B", value: "\u200B" },
                  {
                    name: "**🛡 Tanks 🛡**",
                    value: `**${rosterObjects[0].pseudo}**, ${
                      rosterObjects[0].class
                    }\n\
                    **${rosterObjects[1].pseudo}**, ${rosterObjects[1].class}`,
                    inline: true
                  },
                  { name: "\u200B", value: "\u200B" },
                  {
                    name: "**🚑 Healers 🚑**",
                    value: `**${rosterObjects[10].pseudo}**, ${
                      rosterObjects[10].class
                    }\n\
                    **${rosterObjects[11].pseudo}**, ${
                      rosterObjects[11].class
                    }`,
                    inline: true
                  }
                ]
              }
            });
          });
        });
      }
    });
  }
};
