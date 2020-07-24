const Discord = require('discord.js')

module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
    aliases: ['icon', 'pfp'],
    guildOnly: true,
	execute(message) {
		if (!message.mentions.users.size) {
			const yourEmbed = new Discord.MessageEmbed()
				.setTitle('Your Avatar')
				.setImage(message.author.displayAvatarURL({ dynamic: true }))
			return message.channel.send(yourEmbed)
		}

		const avatarList = message.mentions.users.map(user => {
			const mentionEmbed = new Discord.MessageEmbed()
				.setTitle(`${user.username}'s Avatar`)
				.setImage(user.displayAvatarURL({ dynamic: true }))
			return message.channel.send(mentionEmbed)
		});

	},
};