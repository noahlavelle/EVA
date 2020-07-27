const discord = require('discord.js')

module.exports = {
	name: 'kick',
    description: 'Kicks a player',
    args: true,
    usage: '<player> <reason>',
    examples: 'kick @ZigZagZat Bad at Fortnite',
    userPermissions: ['KICK_MEMBERS'],
    guildOnly: true,
    execute(message, args, client) {
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I don't have permission to do that!")
        const kick_player = args[0].replace(/[^0-9]/g, '')
        if (!args[0]) return message.chnnel.send("You didn't enter a player")
        if (!message.guild.members.cache.has(kick_player)) return message.channel.send("That player isn't in this server!")
        if (!args[1]) return message.channel.send("You didn't enter a reason")
        let step = 0
        let kick_reason
        while (step < args.length - 1) {
            step++
            if (step == 1) {
                kick_reason = args[step]
            }
            else {
            kick_reason = kick_reason + ' ' + args[step]
            }
        }
        try {
            const player_kick_embed = new discord.MessageEmbed()
                .setColor('RED')
                .setTitle('You have been kicked from `' + message.guild.name + '`')
                .setDescription('**Reason**: `' + kick_reason + '`\n**By**:`' + message.author.username + '`')
                .setTimestamp()
            client.users.cache.get(kick_player).send(player_kick_embed)
            setTimeout(function(){
            message.guild.members.cache.get(kick_player).kick({reason: kick_reason})
            const kick_embed = new discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Sucsessfully kicked `' +  client.users.cache.get(kick_player).username + '`')
                .setDescription('**Reason**: `' + kick_reason + '`\n**By**:`' + message.author.username + '`')
                .setTimestamp()
            message.channel.send(kick_embed)
            }, 1000)
        }
        catch(err) {
            message.channel.send("It looks like i don't have permission to do that!")
        }
    }
}