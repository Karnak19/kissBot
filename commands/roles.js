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
            message.reply(`Dommage ! t'es plus ${role}`);
         } else {
            message.member.addRole(role);
            message.reply(`T'as le rôle ${role} gros`);
         }
      } else if (args[0] === "magicka") {
         let role = message.guild.roles.find("name", "Magicka");
         if (message.member.roles.find("name", "Magicka")) {
            message.member.removeRole(role);
            message.reply(`Dommage ! t'es plus ${role}`);
         } else {
            message.member.addRole(role);
            message.reply(`T'as le rôle ${role} gros`);
         }
      } else {
         message.reply("Eh ça existe pas ce rôle");
      }
   }
};
