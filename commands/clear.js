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
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed('You do not have permission to use this command.', '#EB403B'))
        client.channels.fetch(args[0].replace(idRegex, ''))
            .then((channel) => {
                channel.bulkDelete(parseInt(args[1]))
            })
            .catch(() => {
                message.channel.send('That channel does not exist.')
            })

        function embed(message, color) {
            const embedError = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(message)
            return embedError
        }
	}
};