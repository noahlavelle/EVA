const Discord = require('discord.js')
let idRegex = (/[^a-z]/g)

module.exports = {
	name: 'roll',
    description: 'Roles a die any size or flips a coin',
    usage: '<die size>',
    examples: 'roll 6 - Rolls a 6 sided dice\nflip - flips a coin',
    aliases: ['die', 'dice', 'd', 'flip', 'coin'],
    guildOnly: false,
	execute(message,  args, client) {
        var coin = ['heads', 'tails']
        var command = message.content.toLowerCase().replace(idRegex, '')
        if (!Number.isInteger(parseInt(args[0])) || args[0] <= 0) return message.channel.send(embed(':game_die: I cannot roll a die of that size', '#EB403B'))
        switch (command) {
            case 'roll': case 'die': case 'dice': case 'd':
                message.channel.send(embed(`:game_die: You rolled a ${args[0]} sided die. You got ${Math.round(Math.random() * args[0] + 1)}`, '#3498db'))
                break;
            case 'flip': case 'coin':
                message.channel.send(embed(`:moneybag: You flipped a coin, it was ${coin[Math.round(Math.random())]}!`, '#3498db'))
                break;
        }

        function embed(message, color) {
            const embedError = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(message)
            return embedError
        }
	},
};