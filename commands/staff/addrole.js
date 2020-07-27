let u = require('../../utils')

module.exports = {
	name: 'addrole',
    description: 'Adds a role to the server',
    args: true,
    usage: '<role name> <role colour>',
    aliases: ['addrank'],
    argsDefaults: [
        [],
        ['#99AAB5']
    ],
    userPermissions: ['MANAGE_ROLES'],
    guildOnly: true,
	execute(message, args, client) {
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