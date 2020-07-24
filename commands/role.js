module.exports = {
	name: 'role',
    description: 'Gives a user a role.',
    args: true,
    usage: '<role> <user>',
    aliases: ['rank'],
    guildOnly: true,
	execute(message, args, client) {
            if (message.guild.roles.cache.find(r => r.name === args[0])) {
                message.member.roles.add(message.guild.roles.cache.find(role => role.name === args[0]))
                message.channel.send(`Added role ${args[0]} to user ${message.member}.`)
            }
            else {
                message.channel.send('That role does not exist')
            }
	},
};