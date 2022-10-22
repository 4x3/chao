const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'unban',
    category : 'moderation',
    description : 'unbans a specific user',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('you are missing **BAN_MEMBERS** permission!').then((m) => m.delete({ timeout: 5000 }));

		if (!args[0]) return message.channel.send('please specify a member to unban').then((m) => m.delete({ timeout: 5000 }));

		let member;

		try {
			member = await client.users.fetch(args[0]);
		} catch (e) {
			console.log(e);
			return message.channel.send('not a valid user!').then((m) => m.delete({ timeout: 5000 }));
		}

		const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

		const embed = new MessageEmbed()
			.setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

		return message.guild.fetchBans().then((bans) => {
			const user = bans.find((ban) => ban.user.id === member.id);

			if (user) {
				embed.setTitle(`successfully unbanned ${user.user.tag}`)
					.setColor('#00ff00')
					.addField('user id', user.user.id, true)
					.addField('user tag', user.user.tag, true)
					.addField('banned reason', user.reason != null ? user.reason : 'no reason')
					.addField('unbanned reason', reason);
				message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed));
			} else {
				embed.setTitle(`user ${member.tag} isn't banned!`)
					.setColor('#ff0000');
				message.channel.send(embed);
			}
		}).catch((e) => {
			console.log(e);
			message.channel.send('an error has occurred!');
		});
	},
};
