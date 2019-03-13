module.exports = class RoleCreation {
   static match(message) {
      return message.content.startsWith("!role");
   }

   static action(message) {
      let args = message.content.split(" ");
      args.shift();

      if (args[0] === "stamina") {
         let role = message.guild.roles.find("name", "Stamina");
         if (message.member.roles.find("name", "Stamina")) {
            message.member.removeRole(role);
            message.reply("C'est enlevé !");
         } else {
            message.member.addRole(role);
            message.reply(`T'as le rôle ${role} gros`);
         }
      }
   }
};
