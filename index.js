require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();

const Google = require("./commands/google.js");
const Roles = require("./commands/roles.js");
const Event = require("./commands/event.js");
const Team = require("./commands/team.js");
const Rand = require("./commands/rand.js");

const customMojis = require("./global/customMojis.js");

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

  if (message.content === "!github") {
    message.channel.send("https://github.com/Karnak19/kissBot");
  }

  if (message.content === "!letsgo") {
    message.channel.send("https://www.youtube.com/watch?v=SNUuB_rmIQI");
  }

  if (Rand.match(message)) {
    return Rand.action(message);
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

  if (Team.match(message)) {
    return Team.action(message);
  }
});

bot.on("messageReactionRemove", (reaction, user) => {
  if (
    Event.signUp(reaction.message, reaction.emoji) &&
    user.username !== process.env.botUsername
  ) {
    if (reaction.users.size < 1) {
      reaction.message.react(reaction.emoji);
    }
  }
});

bot.on("messageReactionAdd", (reaction, user) => {
  if (
    Event.signUp(reaction.message, reaction.emoji) &&
    user.username !== process.env.botUsername
  ) {
    let author = reaction.message.author;
    reaction.message.reactions.some(react => {
      react.fetchUsers(1).then(usr => {
        if (usr.size < 3 && usr.has(author.id)) {
          reaction.remove(author.id);
        }
        if (react.emoji !== reaction.emoji) {
          if (usr.has(user.id)) {
            react.remove(user.id);
          }
        }
      });
    });

    user.send(" tu es inscrit en: " + emoji(reaction.emoji));
  }
});

bot.login(process.env.TOKEN);
