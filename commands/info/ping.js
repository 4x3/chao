const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'info',
    description : 'returns latency and api ping',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(`pinging...`)
        const embed = new MessageEmbed()
            .setTitle('ping')
            .setDescription(`websocket ping is ${client.ws.ping}ms\nmessage edit ping is ${Math.floor(msg.createdAt - message.createdAt)}ms`)
            await message.channel.send(embed)
            msg.delete()

    }
}
