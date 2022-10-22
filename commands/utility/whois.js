const Discord = require("discord.js")

module.exports = {
name: "whois",
aliases: ["info"],
category: "utility",
description: "gets information about a user",
usage: "[command | user] or [command]",
run: async (client, message, args) => {
//command

{
const user = message.mentions.users.first();
if(!user)
    return message.reply('please mention the user who you want info about');

var playing = ("[ " + user.presence.activities + " ]")

const whothefuq = new Discord.MessageEmbed()
      .setTitle("user info:")
      .addField("full username", `${user.tag}`)
      .addField("id", user.id)
      .addField("playing",playing, true)
      .addField("status", `${user.presence.status}`, true)
      .addField("joined discord at", user.createdAt)
      .setColor("RANDOM")
      .setTimestamp()
      .setThumbnail(user.avatarURL())  
  message.channel.send(whothefuq)

};
}
   


};