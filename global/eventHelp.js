const eventHelp = {
  embed: {
    author: {
      name: process.env.botUsername,
      icon_url:
        "https://cdn.discordapp.com/app-icons/554966772604993548/a01ce45d641c6e3f8752bc4cbf4cbb6b.png"
    },
    thumbnail: {
      url:
        "https://cdn.discordapp.com/app-icons/554966772604993548/a01ce45d641c6e3f8752bc4cbf4cbb6b.png"
    },
    color: 10038562,
    fields: [
      {
        name: "[Raid name] : required <:pogey:581098478080491522>",
        value:
          "```ss  :  Sunspire```\
               ```cr  :  Cloudrest```\
               ```as  :  Asylum Sanctorium```\
               ```hof :  Halls of Fabrication```\
               ```mol :  Maw of Lorkhaj```\
               ```hrc :  Hel Ra Citadel```\
               ```so  :  Sanctum Ophidia```\
               ```aa  :  Aetherian Archive```"
      },
      { name: "\u200b", value: "\u200b" },
      {
        name: "[date] : required <:pogey:581098478080491522>",
        value: "```DD/MM/YYYY```",
        inline: true
      },
      {
        name: "[hours] : required <:pogey:581098478080491522>",
        value: "```HH:MM``` (24-hour clock)",
        inline: true
      },
      { name: "\u200b", value: "\u200b" },
      {
        name: "[Raid type] : optional",
        value:
          "```hm```\
               ```progress```\
               ```vitalité```\
               ```score```"
      },
      { name: "\u200b", value: "\u200b" },
      {
        name: "[Event type] : optional",
        value: "```ouvert```\
               ```selectif```",
        inline: true
      },
      { name: "\u200b", value: "\u200b" },
      {
        name: "Examples :",
        value:
          "```!event create cr 30/05/2019 21:00 progress (optional) selectif (optional)```"
      }
    ]
  }
};

module.exports = eventHelp;
