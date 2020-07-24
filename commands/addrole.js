module.exports = {
	name: 'addrole',
    description: 'Adds a role to the server',
    args: true,
    usage: '<role name> <role colour>',
    aliases: ['addrank'],
    guildOnly: true,
	execute(message, args, client) {
        if (!message.guild.roles.cache.find(r => r.name === args[0])) {
            message.guild.roles.create({
                data: {
                    name: args[0],
                    color: `#${args[1]}`
                },
                reason: `requested by ${message.author.username}`
            })
            if (typeof args[1] == 'undefined') args[1] = '99AAB5'
            message.channel.send(`A role has been created called ${args[0]} with a colour of #${args[1]}`)
        }
        else {
            message.channel.send('That role already exists')
        }
	},
};