const discord = require('discord.js')

module.exports = {
	name: 'ban',
    description: 'Bans a player',
    args: true,
    usage: '<player> <reason>',
    examples: 'ban @ZigZagZat Bad at Fortnite',
    userPermissions: ['BAN_MEMBERS'],
    guildOnly: true,
    execute(message, args, client) {
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I don't have permission to do that!")
        const ban_player = args[0].replace(/[^0-9]/g, '')
        if (!args[0]) return message.chnnel.send("You didn't enter a player")
        if (!message.guild.members.cache.has(ban_player)) return message.channel.send("That player isn't in this server!")
        if (!args[1]) return message.channel.send("You didn't enter a reason")
        let step = 0
        let ban_reason
        while (step < args.length - 1) {
            step++
            if (step == 1) {
                ban_reason = args[step]
            }
            else {
            ban_reason = ban_reason + ' ' + args[step]
            }
        }
        try {
            const player_ban_embed = new discord.MessageEmbed()
                .setColor('RED')
                .setTitle('You have been banned from `' + message.guild.name + '`')
                .setDescription('**Reason**: `' + ban_reason + '`\n**By**:`' + message.author.username + '`')
                .setTimestamp()
            client.users.cache.get(ban_player).send(player_ban_embed)
            setTimeout(function(){
            message.guild.members.cache.get(ban_player).ban({reason: ban_reason})
            const ban_embed = new discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Sucsessfully banned `' +  client.users.cache.get(ban_player).username + '`')
                .setDescription('**Reason**: `' + ban_reason + '`\n**By**:`' + message.author.username + '`')
                .setTimestamp()
            message.channel.send(ban_embed)
            }, 1000)
        }
        catch(err) {
            message.channel.send("It looks like i don't have permission to do that!")
        }
    }
}