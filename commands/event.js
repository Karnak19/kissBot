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
        // args : create , raid, HM ou non, Jour JJ/MM/AAAA, heure HH:MM, core ou raider ou 2

        args[1] = args[1].toLowerCase();
        if(args[1].startsWith('v')) {
            args[1] = args[1].replace('v', '');
        }
        if(!RaidList.some(raid => raid.label === args[1])) console.log('non');//return createRaidError(message, args[1]);

        let date = args[3].split("/");
        let eventDate = Date.UTC(date[2], date[1]-1, date[0]);
        if(!eventDate) console.log('wrong date');
        let dateFormat = new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',});
        return RaidList.some(raid => {
            if(raid.label === args[1]) {
                return message.channel.send(`${raid.name} ${args[2]} le ${dateFormat.format(eventDate)}`);
            };
        });

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
 