let u = require('../../utils')

module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
    aliases: ['icon', 'pfp'],
    guildOnly: true,
	execute(message, args, client) {
		if (!args[0]) {
			message.channel.send(u.imageEmbed(`Your Avatar`, '#3498db', message.author.displayAvatarURL({ dynamic: true })))
		}
		message.mentions.users.map(user => {
			return message.channel.send(u.imageEmbed(`${user.username}'s Avatar`, '#3498db', user.displayAvatarURL({ dynamic: true })))
		});

	},
};