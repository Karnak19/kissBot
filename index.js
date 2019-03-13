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
   return emoji.id === null ? emoji.name  :`<:${emoji.name}:${emoji.id}>`;
}

function userMention(user){
    return `<@${user.id}>`
}

// Bot
bot.on("ready", function() {
   bot.user.setActivity("Soulever des mères").catch(console.error);
});

bot.on("message", function(message) {
   if (message.content === "!ping") {
      message.channel.send("Pong");
   }

   if (Google.match(message)) {
      return Google.action(message);
   }

   if (Roles.match(message)) {
      return Roles.action(message);
   }
});

bot.on("messageReactionAdd", (reaction, user) => {
   if(Event.signUp(reaction.message, reaction.emoji)){
      reaction.message.channel.send(userMention(user) + " tu es inscrit en: " + emoji(reaction.emoji));
   }
});

bot.login("NTU0OTY2NzcyNjA0OTkzNTQ4.D2qN3w.uV-0Fy_FemGpPMx5p8nh_DsspQg");
