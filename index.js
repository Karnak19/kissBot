require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();

const Google = require("./commands/google.js");
const Roles = require("./commands/roles.js");
const Event = require("./commands/event.js");

const emojis = {
  beer: "🍺",
  shield: "🛡",
  sword: "⚔"
};

// Global usefull function (should be placed in another file)

// if emoji has an id it is a custom one so we display it another way
function emoji(emoji) {
  return emoji.id === null ? emoji.name : `<:${emoji.name}:${emoji.id}>`;
}

function userMention(user) {
  return `<@${user.id}>`;
}

// Bot
bot.on("ready", function() {
  bot.user.setActivity("Soulever des mères").catch(console.error);
});

bot.on("message", function(message) {
  if (message.content === "!ping") {
    message.channel.send("Pong");
  }

  //   It makes the prod Bot crash
  //   TODO: Fix this
  if (message.content === "!rand") {
    message.reply(Math.floor(Math.random() * 101));
  }

  if (Google.match(message)) {
    return Google.action(message);
  }

  if (Roles.match(message)) {
    return Roles.action(message);
  }

  if (Event.match(message)) {
    return Event.action(message);
  }
});

bot.on("messageReactionAdd", (reaction, user) => {
  if (
    Event.signUp(reaction.message, reaction.emoji) &&
    user.username !== "Kiss Bot"
  ) {
    reaction.message.reactions.some(react => {
      if (react.emoji !== reaction.emoji) {
        react.fetchUsers(1).then(usr => {
          if (usr.has(user.id)) {
            react.remove(user.id);
          }
        });
      }
    });
    reaction.message.channel
      .send(userMention(user) + " tu es inscrit en: " + emoji(reaction.emoji))
      .then(newMsg => {
        setTimeout(() => {
          newMsg.delete();
        }, 3000);
      });
  }
});

bot.login(process.env.TOKEN);
