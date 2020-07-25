const Discord = require('discord.js')

module.exports = {
	name: 'announce',
    description: 'Sends an embed announcment to a given channel',
    args: true,
    usage: '<subcommand> <channel> <message>',
    subcommands: 'announce <channel> - Does not mention anyone\nannounce @everyone <channel> - Mentions everyone\nannounce @here <channel> - Mentions everyone in a channel\nannounce role <@role> <channel> - Mentions everyone of a role',
    examples: 'announce #general Hello World\nannounce @everyone #general Hello World\nannounce @here #general Hello World\nannounce role @Member #general Hello World',
    aliases: ['embed'],
    guildOnly: true,
	execute(message, args, client) {
        let tag;
        let iStart;
        switch (args[0]) {
            case '@everyone':
                iStart = 2
                tag = args[0]
                generateEmbed()
                break;
            case '@here':
                tag = args[0]
                iStart = 2
                generateEmbed()
                break;
            case 'role':
                tag = args[1]
                iStart = 3
                generateEmbed()
                break;
            default:
                iStart = 1
                generateEmbed()
                break;
        }

        function generateEmbed() {
            let compiledMessage = [];
            for (i = iStart; i <= args.length - 1; i++) {
                compiledMessage += args[i] + ' '
                if (i == args.length - 1) {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#3498db')
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(compiledMessage)
                    message.guild.channels.cache.get(args[iStart-1].replace(/[^0-9]/g, '')).send(tag, embed)
                }
            }
        }
	},
};