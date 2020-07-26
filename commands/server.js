const Discord = require('discord.js')

module.exports = {
	name: 'server',
    description: 'Displays info about the current server.',
	cooldown: 5,
	aliases: ['info'],
    guildOnly: true,
	execute(message, args, client) {
		var onlineCount = message.guild.members.cache.filter(m => m.presence.status === 'online').size
		const embed = new Discord.MessageEmbed()
			.setTitle(`Server info for: ${message.guild.name}`)
			.setThumbnail(message.guild.iconURL())
			.addFields(
				{ name: `Total Members: ${message.guild.memberCount}`, value: `Total Online Members: ${onlineCount}`}
			)
			
		message.channel.send(embed)
	},
};