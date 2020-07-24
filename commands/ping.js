const Discord = require('discord.js')

module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['latency', 'ms'],
    cooldown: 5,
	execute(message, args, client) {
		message.channel.send("Pinging...").then(m =>{
			var ping = m.createdTimestamp - message.createdTimestamp;
			const embed = new Discord.MessageEmbed()
				.setTitle(`:ping_pong:  Pong!`)
				.setDescription(`Your Ping is: ${ping}ms`);
            m.edit(embed);
        });
	},
};