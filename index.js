const Discord = require("discord.js");
const bot = new Discord.Client();

require("dotenv").config();

const Google = require("./commands/google.js");
const Roles = require("./commands/roles.js");

const emojis = {
   beer: "🍺"
};
function emoji(code) {
   return emojis[code];
}

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
   if (reaction.emoji.name === emoji("beer")) {
      console.log(reaction.users);
   }
});

bot.login(process.env.token);

console.log(process.env.token);
