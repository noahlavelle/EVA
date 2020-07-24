const Discord = require('discord.js')
const idRegex = /[^0-9]/g;

module.exports = {
	name: 'clear',
    description: 'Clears a certain amount of previous messages',
    cooldown: 5,
    aliases: ['delete', 'wipe'],
    usage: '<channel> <amount>',
    args: true,
    guildOnly: true,
	execute(message, args, client) {
        client.channels.fetch(args[0].replace(idRegex, ''))
            .then((channel) => {
                channel.bulkDelete(parseInt(args[1]))
            })
            .catch(() => {
                message.channel.send('That channel does not exist.')
            })
	}
};