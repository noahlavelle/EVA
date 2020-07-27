const idRegex = /[^0-9]/g;

module.exports = {
	name: 'clear',
    description: 'Clears a certain amount of previous messages',
    cooldown: 5,
    aliases: ['delete', 'wipe'],
    usage: '<amount> <channel>',
    userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
    args: true,
    guildOnly: true,
	execute(message, args, client) {
        if (args.length == 1) args.push(message.channel.id)
        number = parseInt(args[0])
        if (!typeof number == 'number' || number < 0 || number > 100) { 
            return message.reply('Please enter a valid number of messages to be deleted');
        }
        client.channels.cache.get(args[1].replace(idRegex, ''))
        .bulkDelete(number)
        .then(message.channel.send(`Deleted ${number} messages`))

	}
};