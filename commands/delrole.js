const { GuildMember } = require("discord.js");

module.exports = {
	name: 'delrole',
    description: 'Removes a role to the server',
    args: true,
    usage: '<role name>',
    aliases: ['delrank'],
    guildOnly: true,
	execute(message, args, client) {
        let roleFind = message.guild.roles.cache.find(r => r.name === args[0]);
        if (roleFind && message.member.hasPermission('ADMINISTRATOR')) {
            roleFind.delete();
            message.channel.send(`The role ${args[0]} has been deleted`)
        }
        else {
            message.channel.send('That role does not exist or you do not have permission to preform that command')
        }
	},
};``