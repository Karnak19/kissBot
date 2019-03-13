module.exports = class Google {
   static match(message) {
      return message.content.startsWith("!google");
   }

   static action(message) {
      let args = message.content.split(" ");
      args.shift();
      message.reply("https://www.google.com/#q=" + args.join("%20"));
   }
};
