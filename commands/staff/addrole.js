let u = require('../../utils')

module.exports = {
	name: 'addrole',
    description: 'Adds a role to the server',
    args: true,
    usage: '<role name> <role colour>',
    aliases: ['addrank'],
    argsDefaults: [
        [],
        ['#99aab5']
    ],
    guildOnly: true,
	execute(message, args, client) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(u.embed('You do not have permission to use this command.', '#EB403B'))
        message.guild.roles
            .create({
                data: {
                    name: args[0],
                    color: args[1],
                },
                reason: `Created upon the request of ${message.author.username}`
            })
            .then(message.reply(`Created a role called ${args[0]} with a color of ${args[1]}`))
            .catch(e => {
                console.error(e)
                message.reply('Something went wrong while creating that role')
            })
	},
};