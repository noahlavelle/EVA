let u = require('../../utils')

const Discord = require('discord.js')
const idRegex = /[^0-9]/g;

module.exports = {
	name: 'clear',
    description: 'Clears a certain amount of previous messages',
    cooldown: 5,
    aliases: ['delete', 'wipe'],
    usage: '<amount> <channel>',
    args: true,
    guildOnly: true,
	execute(message, args, client) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(u.embed('You do not have permission to use this command.', '#EB403B'))
        if(args.length == 1) args.push(message.channel.id)
        client.channels.cache.get(args[1].replace(idRegex, ''))
            .bulkDelete(parseInt(args[0]))
            .then(message.channel.send(`Deleted ${args[0]} messages`))
            .catch(e => {
                console.error(e)
                message.channel.send('Something went wrong while deleting those messages')
            })

	}
};