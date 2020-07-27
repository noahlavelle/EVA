let u = require('../../utils')

const Discord = require("discord.js");

module.exports = {
	name: 'delrole',
    description: 'Removes a role to the server',
    args: true,
    usage: '<role name>',
    aliases: ['delrank'],
    userPermissions: ['MANAGE_ROLES'],
    guildOnly: true,
	execute(message, args, client) {
        let role = message.guild.roles.cache.find(r => r.name === args[0]);
        if (!role) return message.reply(`${args[0]} is not a valid role`);
        role
            .delete(args[0])
            .then(message.reply(`Role ${args[0]} has been deleted`))
            .catch(e => {
                console.error(e)
                message.reply('Something went wrong while deleting that role.')
            })
	},
};