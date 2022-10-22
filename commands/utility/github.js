const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'github',
  description: 'shows information about github user',
  aliases: ["github"],
  usage: '<query>',
  category: 'utility',
  run: async (bot, message, args) => {

    const name = args.join(' ');
    if (!name) {
      return message.channel.send(
        `${bot.emotes.error}  please provide a valid user`,
      );
    }

    const url = `https://api.github.com/users/${name}`;

    let response;
    try {
      response = await fetch(url).then(res => res.json());
    }
    catch (e) {
      return message.channel.send(
        `${bot.emotes.error} an error occurred, please try again!`,
      );
    }

    try {
      const embed = new MessageEmbed()
        .setColor('cccfff')
        .setTitle(`${response.login} (${response.id})`)
        .setDescription(response.bio ? response.bio : 'none')
        .addFields(
          { name: '>> followers', value: `\`\`\`${response.followers.toLocaleString()}\`\`\``, inline: true },
          { name: '>> following', value: `\`\`\`${response.following.toLocaleString()}\`\`\``, inline: true },
          { name: '>> repositories', value: `\`\`\`${response.public_repos.toLocaleString()}\`\`\``, inline: true },
          { name: '>> email', value: `\`\`\`${response.email ? response.email : 'none'}\`\`\`` },
          { name: '>> company', value: `\`\`\`${response.company ? response.company : 'none'}\`\`\`` },
          { name: '>> location', value: `\`\`\`${response.location ? response.location : 'none'}\`\`\`` },
        )
        .setURL(response.html_url)
        .setThumbnail(response.avatar_url)
        .setTimestamp();

      message.channel.send(embed);
    }
    catch (err) {
      return message.channel.send(
        `${bot.emotes.error} please provide a valid user`,
      );
    }
  }
};