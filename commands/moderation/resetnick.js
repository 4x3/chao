const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "resetnick",
  aliases : ['rnick'],
  category : 'moderation',
  description : 'resets a users nickname',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply("please specify a member");

    try {
      member.setNickname(null);
    } catch (err) {
      message.reply(
        "i do not have permission to reset " + member.toString() + " nickname"
      );
    }
  },
};
