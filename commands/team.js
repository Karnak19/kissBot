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
          let mentionTag = "<@&462944441418645504> <@&463026026000154625>";
          const roster = [];
          const player1 = [];
          const player2 = [];
          const player3 = [];
          const player4 = [];
          const player5 = [];
          const player6 = [];
          const player7 = [];
          const player8 = [];
          const player9 = [];
          const player10 = [];
          const player11 = [];
          const player12 = [];
          const keysMap = { 0: "role", 1: "name", 2: "class" };

          doc.getRows(2, function(err, rows) {
            rows.map(row => {
              player1.push(row["player"]);
              player2.push(row["player_2"]);
              player3.push(row["player_3"]);
              player4.push(row["player_4"]);
              player5.push(row["player_5"]);
              player6.push(row["player_6"]);
              player7.push(row["player_7"]);
              player8.push(row["player_8"]);
              player9.push(row["player_9"]);
              player10.push(row["player_10"]);
              player11.push(row["player_11"]);
              player12.push(row["player_12"]);
            });

            roster.push(
              player1,
              player2,
              player3,
              player4,
              player5,
              player6,
              player7,
              player8,
              player9,
              player10,
              player11,
              player12
            );

            const rosterObjects = roster.map(member => {
              let memberObj = { ...member };
              return objectRenameKeys(memberObj, keysMap);
            });

            const tanks = rosterObjects.filter(tank => {
              return tank.role.includes("Tank");
            });

            const deeps = rosterObjects.filter(dps => {
              return dps.role.includes("DD");
            });
            const healers = rosterObjects.filter(heal => {
              return heal.role.includes("Heal");
            });

            console.table(tanks);
            console.table(deeps);
            console.table(healers);

            return message.channel.send(`**[Team]** ${mentionTag}`, {
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
                    value: `${deeps
                      .map(dps => {
                        return `**${dps.name}**, ${dps.class}\n`;
                      })
                      .join("")}`
                  },
                  { name: "\u200B", value: "\u200B" },
                  {
                    name: "**🛡 Tanks 🛡**",
                    value: `${tanks
                      .map(tank => {
                        return `**${tank.name}**, ${tank.class}\n`;
                      })
                      .join("")}`,
                    inline: true
                  },
                  { name: "\u200B", value: "\u200B" },
                  {
                    name: "**🚑 Healers 🚑**",
                    value: `${healers
                      .map(heal => {
                        return `**${heal.name}**, ${heal.class}\n`;
                      })
                      .join("")}`,
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
