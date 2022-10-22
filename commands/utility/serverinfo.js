const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  category: "utility",
description: "shows info about a server",
usage: "[command]",
run: async (client, message, args) => {
//command
let servericon = message.guild.iconURL;
let serverembed = new Discord.MessageEmbed()
.setTitle("server information")
.setColor("RANDOM")
.setThumbnail(servericon)
.addField("server name", message.guild.name)
.addField("owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
.addField("channels", message.guild.channels.cache.size, true)
.addField("roles", message.guild.roles.cache.size, true)
.addField("created on", message.guild.createdAt)
.addField("you joined", message.member.joinedAt)
.addField("total members", message.guild.memberCount)
.setThumbnail(message.guild.iconURL())
.setTimestamp()
.setFooter(message.author.username, message.author.avatarURL);
message.channel.send(serverembed);
}
};