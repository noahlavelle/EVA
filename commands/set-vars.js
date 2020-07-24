const {
    prefix,
    token
} = require('../config.json');

module.exports = {
	name: 'set-vars',
    description: 'Sets server variables',
    args: true,
    usage: '<var> <value>',
    subcommands: `${prefix}set-var prefix <value> - Changes prefix\n ${prefix}set-var staffroles <role, role, role etc.> - Sets roles that cannot be set by bots without user having admin\n ${prefix}set-var default-role <role> - Changes the role given to new users`,
    aliases: ['vars, function-vars'],
    guildOnly: true,
	execute(message, args, client) {
	},
};