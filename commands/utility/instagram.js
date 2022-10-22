const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'instagram',
	category: 'utility',
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send('please enter a channel name');
		}
		let url; let response; let account; let
			details;
		try {
			url = `https://instagram.com/${args[0]}/?__a=1`;
			response = await axios.get(url);
			account = response.data;
			details = account.graphql.user;
		} catch (error) {
			return message.channel.send('not a account');
		}

		const embed = new MessageEmbed()
			.setTitle(`${details.is_verified ? `${details.username} <a:verified:727820439497211994>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
			.setDescription(details.biography)
			.setThumbnail(details.profile_pic_url)
			.addFields(
				{
					name: 'total posts:',
					value: details.edge_owner_to_timeline_media.count.toLocaleString(),
					inline: true,
				},
				{
					name: 'followers:',
					value: details.edge_followed_by.count.toLocaleString(),
					inline: true,
				},
				{
					name: 'following:',
					value: details.edge_follow.count.toLocaleString(),
					inline: true,
				},
			);
		return message.channel.send(embed);
	},
};
