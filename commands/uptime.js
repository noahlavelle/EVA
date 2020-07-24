const Discord = require('discord.js')
const client = new Discord.Client()
const moment = require("moment");
require("moment-duration-format");

module.exports = {
	name: 'uptime',
    description: 'Displays the server uptime.',
    cooldown: 5,
	execute(message, args, client) {
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const embed = new Discord.MessageEmbed()
            .setTitle(':signal_strength:  Uptime')
            .addField(`The bot uptime is: ${duration}`, '\u200b')
        message.channel.send(embed)
	},
};