require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();

const Google = require("./commands/google.js");
const Roles = require("./commands/roles.js");
const Event = require("./commands/event.js");

const emojis = {
  beer: "🍺",
  shield: "🛡",
  sword: "⚔",
  pogey: "<:pogey:581098478080491522>",
  hidethepain: "<:hidethepain:462810248059682816>",
  peepolove: "<:peepolove:470754803149176835>",
  pepe: "<:pepe:477440085403369472>",
  ree: "<:REE:534698576274784257>",
  pagchomp: "<:pagchomp:581098572578160663>",
  risitas: "<:risitas:486242894970355714>",
  peepo: "<:peepo:484754067969671179>",
  pepehang: "<:pepehang:505346510716665856>",
  lol: "<:lol:462808930058371073>"
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

  if (message.content === "!rand") {
    let rand = Math.floor(Math.random() * 101);
    if (rand >= 90) message.reply(`${rand} ${emojis.pogey}`);
    else if (rand >= 80) message.reply(`${rand} ${emojis.pagchomp}`);
    else if (rand >= 70) message.reply(`${rand} ${emojis.peepolove}`);
    else if (rand >= 60) message.reply(`${rand} ${emojis.peepo}`);
    else if (rand >= 50) message.reply(`${rand} ${emojis.pepe}`);
    else if (rand >= 40) message.reply(`${rand} ${emojis.risitas}`);
    else if (rand >= 30) message.reply(`${rand} ${emojis.pepehang}`);
    else if (rand >= 20) message.reply(`${rand} ${emojis.ree}`);
    else if (rand >= 10) message.reply(`${rand} ${emojis.hidethepain}`);
    else if (rand >= 00) message.reply(`${rand} ${emojis.lol}`);
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
