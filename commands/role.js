let player;
const {
    staffRoles
} = require('../config.json');

module.exports = {
	name: 'role',
    description: 'Gives a user a role. Can only give roles lower than it.',
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
                return message.channel.send('That player does not exist')
            }
            giveRole()
            
        }
        else {
            message.channel.send('That role does not exist')
        }

        function giveRole() {
            let playerGot = message.guild.members.cache.get(player)
            playerGot.roles.add(message.member.guild.roles.cache.find(r => r.name === args[0]));
            message.channel.send(`Added user <@${player}> to role ${args[0]}`)
        }
	},
};