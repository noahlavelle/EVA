let u = require('../../utils')

const Discord = require("discord.js");

module.exports = {
	name: 'delrole',
    description: 'Removes a role to the server',
    args: true,
    usage: '<role name>',
    aliases: ['delrank'],
    guildOnly: true,
	execute(message, args, client) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(u.embed('You do not have permission to use this command.', '#EB403B'))
        let roleFind = message.guild.roles.cache.find(r => r.name === args[0]);
        if (roleFind && message.member.hasPermission('ADMINISTRATOR')) {
            roleFind.delete();
            message.channel.send(u.embed(`The role ${args[0]} has been deleted`, '#00D166'))
            return
        }

        message.channel.send(u.embed('That role does not exist', '#EB403B'))
	},
};