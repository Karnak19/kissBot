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
  bot.user.setActivity("Soulever des mèrez").catch(console.error);
});

bot.on("message", function(message) {
  if (message.content === "!ping") {
    message.channel.send("Pong");
  }

  if (Rand.match(message)) {
    return Rand.action(message);
  }
  /*if (message.content === "!rand") {
    let rand = Math.floor(Math.random() * 101);
    if (rand >= 90) message.reply(`${rand} ${customMojis.pogey}`);
    else if (rand >= 80) message.reply(`${rand} ${customMojis.pagchomp}`);
    else if (rand >= 70) message.reply(`${rand} ${customMojis.peepolove}`);
    else if (rand >= 60) message.reply(`${rand} ${customMojis.peepo}`);
    else if (rand >= 50) message.reply(`${rand} ${customMojis.pepe}`);
    else if (rand >= 40) message.reply(`${rand} ${customMojis.risitas}`);
    else if (rand >= 30) message.reply(`${rand} ${customMojis.pepehang}`);
    else if (rand >= 20) message.reply(`${rand} ${customMojis.ree}`);
    else if (rand >= 10) message.reply(`${rand} ${customMojis.hidethepain}`);
    else if (rand >= 00) message.reply(`${rand} ${customMojis.lol}`);
  }*/

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
