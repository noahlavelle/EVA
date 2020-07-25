let u = require('../utils')

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
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(u.embed('You do not have permission to use this command.', '#EB403B'))
        client.channels.fetch(args[0].replace(idRegex, ''))
            .then((channel) => {
                channel.bulkDelete(parseInt(args[1]))
            }) .catch(() => {
                message.channel.send(u.embed('That channel does not exist.', '#EB403B'))
            })

	}
};