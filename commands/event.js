const RaidList = require("../global/raidlist.js");
const eventHelp = require("../global/eventHelp.js");
const { dateFormat } = require("../global/helpers.js");
const allowedEmojis = require("../global/allowedEmoji.js");
module.exports = class Event {
  /*
    Need to  use object oriented instead of parsing arguments from command

    private raid;
    private objectif;
    private date;
    private open;
    private hour;
    private role;
*/
  static match(message) {
    return message.content.startsWith("!event");
  }

  static action(message) {
    let args = message.content.split(" ");
    args.shift();

    if (args[0] === "create") return this.createEvent(message, args);
    if (args[0] === "help") return this.helpMessage(message);
  }

  static helpMessage(message) {
    return message.channel.send(eventHelp);
  }

  static createFormatError(message) {
    return message.channel
      .send("Wrong formating")
      .then(() => Event.helpMessage(message));
  }
  static createRaidError(message) {
    return message.channel.send("Le raid sélectionné n'existe pas");
  }

  static createDateError(message) {
    return message.channel.send(
      "Le format de la date n'est pas correct, utilisez JJ/MM/AAA (21/03/2019 pour le 21 mars 2019)"
    );
  }

  static createError(type, message) {
    switch (type) {
      case "date":
        return this.createDateError(message);
      case "raid":
        return this.createRaidError(message);

      case "format":
        return this.createFormatError(message);
    }
  }

  static createEvent(message, args) {
    // args : create , raid, HM ou non, Jour JJ/MM/AAAA, heure HH:MM, core ou raider ou 2
    if (args.length < 3) return this.createError("format", message);
    args[1] = args[1].toLowerCase();
    if (args[1].startsWith("v")) {
      args[1] = args[1].replace("v", "");
    }

    let date = args[2].split("/");

    let hours = args[3].split(":");
    let eventDate = Date.UTC(date[2], date[1] - 1, date[0], hours[0], hours[1]);

    if (!eventDate) return this.createError("date", message);
    if (!RaidList.some(raid => raid.label === args[1]))
      return this.createError("raid", message);

    let roles = [];
    if (args.length > 6) {
      for (let i = 6; i < args.length; i++) {
        roles.push(args[i]);
      }
    }
    return RaidList.some(raid => {
      if (raid.label === args[1]) {
        return message.channel
          .send(
            "**[Evenement]**\n" +
              roles.toString() +
              " \n _Réagissez a ce message avec :\n" +
              "🛡 Si vous souhaitez TANK\n" +
              "⚔ Si vous souhaitez DPS\n" +
              "🏥 Si vous souhaitez HEAL\n" +
              "➖ Si vous êtes incertain\n" +
              "❌ Si vous êtes absent_",
            {
              type: "PINS_ADD",
              embed: {
                author: process.env.botUsername,
                title: "**Raid, n'oubliez pas de vous inscrire !**",
                image: {
                  url: raid.image
                },
                url: raid.url,
                fields: [
                  {
                    name: " ⚜ **Raid**",
                    value: raid.name,
                    inline: true
                  },
                  {
                    name: "🏁 **Objectif**",
                    value: args[4] || "Progress",
                    inline: true
                  },
                  {
                    name: "📅 **Date**",
                    value: dateFormat.format(eventDate),
                    inline: true
                  },
                  {
                    name: "⛔ **Ouvert**",
                    value: args[5] || "Ouvert",
                    inline: true
                  },
                  {
                    name: "\u200B",
                    value: raid.url
                  }
                ]
              }
            }
          )
          .then(msg => {
            msg
              .react("🛡")
              .then(() => msg.react("⚔"))
              .then(() => msg.react("🏥"))
              .then(() => msg.react("➖"))
              .then(() => msg.react("❌"))
              .then(() => message.delete())
              .catch(err => console.err("One emoji failed to react"));
          });
      }
    });
  }

  // EventString = la string qui va permettre de le différencier des autres messages;
  static signUp(message, emoji) {
    let eventString = "[Evenement]";
    return (
      message.author.username === process.env.botUsername &&
      message.content.includes(eventString) &&
      allowedEmojis(emoji)
    );
  }
};
