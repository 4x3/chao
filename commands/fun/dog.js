const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'dog',
	category: 'fun',
	run: async (client, message, args) => {
		const url = 'https://no-api-key.com/api/v1/annimals/dog';

		let image;
		let fact;
		try {
			const { data } = await axios.get(url);
			image = data.image;
			fact = data.fact;
		} catch (e) {
			return message.channel.send('an error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setTitle('random dog image and fact')
			.setColor('#f3f3f3')
			.setDescription(fact)
			.setImage(image);

		return message.channel.send(embed);
	},
};
