const {
    prefix,
    token
} = require('../config.json');

module.exports = {
	name: 'announce',
    description: 'Sends an embed announcment to a given channel',
    args: true,
    usage: '<subcommand> <channel> <message> <title / or blank>',
    subcommands: `${prefix}announce everyone <channel> - Mentions everyone\n ${prefix}announce here <channel> - Mentions everyone in a channel\n ${prefix}announce role <role> <channel> - Mentions everyone of a role`,
    aliases: ['embed'],
    guildOnly: true,
	execute(message, args, client) {
        console.log(prefix)
	},
};