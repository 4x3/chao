const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'cat',
	category: 'fun',
	run: async (client, message, args) => {
		const url = 'https://no-api-key.com/api/v1/animals/cat';

		let image;
		let fact;
		try {
			const { data } = await axios.get(url);
			console.log(data);
			image = data.image;
			fact = data.fact;
		} catch (e) {
			return message.channel.send('an error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setTitle('random cat image and fact')
			.setColor('#f3f3f3')
			.setDescription(fact)
			.setImage(image);

		return message.channel.send(embed);
	},
};
