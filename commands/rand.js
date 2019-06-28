const customMojis = require("../global/customMojis.js");
let randTable = {};
module.exports = class Rand {
  static match(message) {
    return message.content.startsWith("!rand");
  }
  static argSquish(args) {
    args = args.toString().toLowerCase();
    args = args.replace(/,/g, " ");
    return args;
  }
  static action(message) {
    let args = message.content.split(" ");
    if (args.length == 1) {
      return this.randResponse(Math.floor(Math.random() * 101), message);
    }
    args.shift();
    let action = args[0];
    args = this.argSquish(args, action);

    if (action == "create") {
      args = args.replace(action, "");
      args = args.trim();
      randTable[args] = { rands: [], author: message.author };
      message.reply(
        "Un rand est créer pour: " +
          args +
          "\n Pour participer faite: ```!rand " +
          args +
          " ```" +
          "\n Pour close le rand faite: ```!rand close " +
          args +
          "``` "
      );
    } else if (action == "close") {
      args = args.replace(action, "");
      args = args.trim();
      if (!randTable[args]) {
        console.log("existe pas");
      } else {
        if (message.author !== randTable[args].author) {
          message.reply(" Tu n'est pas authorisé à fermer le rand");
        } else {
          this.closeRand(randTable[args].rands, (index, winner, array) => {
            message.channel.send(
              `Le gagant de ${args} est ${
                array[index].user
              } avec un rand à ${winner}`
            );
          });
        }
      }
    } else {
      args = args.trim();
      if (randTable[args]) {
        let rand = Math.floor(Math.random() * 101);
        this.checkIfUserRanded(message.author, randTable[args].rands, err => {
          if (err) {
            message.reply("Tu as déjà participé");
          } else {
            randTable[args].rands.push({ user: message.author, value: rand });
            this.randResponse(rand, message, "pour: " + args);
          }
        });
      } else {
        console.log("existepas");
      }
    }
  }

  static checkIfUserRanded(user, array, callback) {
    for (let i = 0; i <= array.length; i++) {
      if (array.length > 0 && array[i].user == user) {
        return callback(`${user} a déjà participer`);
      } else {
        return callback(null);
      }
    }
  }
  static closeRand(array, callback) {
    let winner = 0;
    let indexWinner = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].value > winner) {
        winner = array[i].value;
        indexWinner = i;
      }
      if (i == array.length - 1) {
        callback(indexWinner, winner, array);
      }
    }
  }

  static randResponse(rand, message, item) {
    if (rand >= 90) message.reply(`${rand} ${customMojis.pogey} ${item}`);
    else if (rand >= 80)
      message.reply(`${rand} ${customMojis.pagchomp} ${item}`);
    else if (rand >= 70)
      message.reply(`${rand} ${customMojis.peepolove} ${item}`);
    else if (rand >= 60) message.reply(`${rand} ${customMojis.peepo} ${item}`);
    else if (rand >= 50) message.reply(`${rand} ${customMojis.pepe} ${item}`);
    else if (rand >= 40)
      message.reply(`${rand} ${customMojis.risitas} ${item}`);
    else if (rand >= 30)
      message.reply(`${rand} ${customMojis.pepehang} ${item}`);
    else if (rand >= 20) message.reply(`${rand} ${customMojis.ree} ${item}`);
    else if (rand >= 10)
      message.reply(`${rand} ${customMojis.hidethepain} ${item}`);
    else if (rand >= 0) message.reply(`${rand} ${customMojis.lol} ${item}`);
  }
};
