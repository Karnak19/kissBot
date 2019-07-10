const moment = require("moment");
moment.locale("fr");
const raidList = require("../global/raidlist.js");
const GoogleSpreadsheet = require("google-spreadsheet");

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
          let roster = [];
          let player = {};

          doc.getRows(2, function(err, rows) {
            rows.map(row => {
              player = {
                role: row.role,
                name: row.pseudo,
                class: row.class
              };

              roster = [...roster, player];
            });

            const tanks = roster.filter(tank => {
              return tank.role.includes("Tank");
            });

            const deeps = roster.filter(dps => {
              return dps.role.includes("DD");
            });
            const healers = roster.filter(heal => {
              return heal.role.includes("Heal");
            });

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
                  {
                    name: "**🚑 Healers 🚑**",
                    value: `${healers
                      .map(heal => {
                        return `**${heal.name}**, ${heal.class}\n`;
                      })
                      .join("")}`,
                    inline: true
                  },
                  {
                    name: "\u200B",
                    value: `[**LE DOCUMENT**](${raid.url})`
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
