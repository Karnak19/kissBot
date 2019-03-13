module.exports = class Event {
    
    static match(message) {
       return message.content.startsWith("!event");
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
 