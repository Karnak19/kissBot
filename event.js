const RaidList = require('../global/raidlist.js');
module.exports = class Event {
    
    static match(message) {
       return message.content.startsWith("!event");
    }

    static action(message) {
        let args = message.content.split(" ");
        args.shift();

        if(args[0] === 'create') return this.createEvent(message, args);
    }

    static createEvent(message, args){
        console.log(args);
        console.log(Date.parse(args[3]));
        // args : create , raid, HM ou non, Jour JJ/MM/AAAA, heure HH:MM, core ou raider ou 2
        //if(!RaidList.some(raid => raid.label === args[1])) return createRaidError(message, args[1]);

    }

    // EventString = la string qui va permettre de le différencier des autres messages;
    static signUp(message, emoji){
        let eventString = 'Pong';
        return message.author.username === 'Kiss Bot'
            && message.content.includes(eventString)
            && this.allowedEmojis(emoji);
    }

    // should be a global array
    static allowedEmojis(emoji){
        switch(emoji.name) {
            case "🛡":
            return true;

            case "⚔":
            return true;

            default:
            return false;
            
        }
    }
 };
 