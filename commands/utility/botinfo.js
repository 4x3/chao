const { MessageEmbed } = require('discord.js');
const os = require('os');

module.exports = {
	name: 'botinfo',
	category: 'utility',
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL())
			.setTitle('bot stats')
			.setColor('#000000')
			.addFields(
				{
					name: '🌐 servers',
					value: `serving ${client.guilds.cache.size} servers`,
					inline: true,
				},
				{
					name: '📺 channels',
					value: `Serving ${client.channels.cache.size} channels`,
					inline: true,
				},
				{
					name: '👥 server users',
					value: `serving ${client.users.cache.size}`,
					inline: true,
				},
				{
					name: '⏳ ping',
					value: `${Math.round(client.ws.ping)}ms`,
					inline: true,
				},
				{
					name: 'join date',
					value: client.user.createdAt,
					inline: true,
				},
				{
					name: 'server info',
					value: `cores: ${os.cpus().length}`,
					inline: true,
				},
			)
			.setFooter(`created by: ${message.author.tag}`, message.author.displayAvatarURL());

		return message.channel.send(embed);
	},
};
