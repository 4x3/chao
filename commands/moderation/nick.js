const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "nick",
  category : 'moderation',
  description : 'sets a users nickname',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply("please specify a member");

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply("please specify a nickname");

    try {
      member.setNickname(arguments);
    } catch (err) {
      console.log(err);
      message.reply(
        "i do not have permission to set " + member.toString() + " nickname"
      );
    }
  },
};
