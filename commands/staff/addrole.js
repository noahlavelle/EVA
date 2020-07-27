module.exports = {
	name: 'addrole',
    description: 'Adds a role to the server',
    args: true,
    usage: '<role name> <role colour>',
    aliases: ['addrank'],
    userPermissions: ['MANAGE_ROLES'],
    guildOnly: true,
	execute(message, args, client) {
        if (!args[1]) args[1] = '#99AAB5'
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
                message.reply('Something went wrong while creating that role\nIf you think you have found a bug or glitch, please report it on the offical EVABot discord: https://discord.gg/MRaZTwJ')
            })
	},
};