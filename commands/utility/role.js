let u = require('../../utils')

let player;

module.exports = {
	name: 'role',
    description: 'Gives or removes a user a role. Can only give and remove roles lower than it.',
    args: true,
    usage: '<role> <user>',
    aliases: ['rank'],
    guildOnly: true,
	execute(message, args, client) {
        if (args.length == 2) {
            player = args[1].replace(/[^0-9]/g, '')
        }
        else if (args.length == 1) {
            player = message.member.id
        }
        if (message.guild.roles.cache.find(r => r.name === args[0])) {
            if (player == '') {
                return message.reply(u.embed('That player does not exist', '#EB403B'))
            }
            return giveRole()
            
        }
        return message.reply(u.embed('That role does not exist', '#EB403B'))

        function giveRole() {
            let playerGot = message.guild.members.cache.get(player)
            let role = message.member.guild.roles.cache.find(r => r.name === args[0])
            if (playerGot.roles.cache.has(role.id)) {
                playerGot.roles.remove(role);
                return message.channel.send(`Removed role ${role.name} from user <@${player}>`)
            }
            playerGot.roles.add(role);
            message.channel.send(`Added role ${role.name} to role <@${player}>`)
        }
	},
};