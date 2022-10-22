const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'fox',
	category: 'fun',
	run: async (client, message, args) => {
		const url = 'https://some-random-api.ml/img/fox';
		const facts = 'https://some-random-api.ml/facts/fox';

		let image; let
			response;
		let fact; let
			responses;
		try {
			response = await axios.get(url);
			image = response.data;

			responses = await axios.get(facts);
			fact = responses.data;
		} catch (e) {
			return message.channel.send('an error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setTitle('random fox image and fact')
			.setColor('#f3f3f3')
			.setDescription(fact.fact)
			.setImage(image.link);

		return message.channel.send(embed);
	},
};
