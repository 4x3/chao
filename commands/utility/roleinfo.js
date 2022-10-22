const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	name: 'rolename',
	run: async (client, message, args) => {
		// code starts here
		try {
			const roleName = message.guild.roles.cache
				.find((r) => (r.name === args.toString()) || (r.id === args.toString()));

			const perms = new Permissions(roleName.permissions.bitfield).toArray();

			const embed = new MessageEmbed()
				.setColor(roleName.color)
				.setTitle(roleName.name)
				.addFields(
					{
						name: 'role id: ',
						value: roleName.id,
						inline: true,
					},
					{
						name: 'role name: ',
						value: roleName.name,
						inline: true,
					},
					{
						name: 'mentionable: ',
						value: roleName.mentionable ? 'yes' : 'no',
						inline: true,
					},
					{
						name: 'role permissions: ',
						value: perms.join(', '),
					},
				);

			return message.channel.send(embed);
		} catch (e) {
			return message.channel.send('role doesn\'t exist').then(() => console.log(e));
		}
	},
};
