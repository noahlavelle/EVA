const fs = require('fs')
const config = require('../config.json')

module.exports = {
	name: 'vars',
    description: 'Sets server variables',
    args: true,
    usage: '<var> <value>',
    subcommands: `vars prefix <value> - Changes prefix\n vars staffroles <role, role, role etc.> - Sets roles that cannot be set by bots without user having admin\n vars default-role <role> - Changes the role given to new users`,
    aliases: ['setvars, servervars'],
    guildOnly: true,
	execute(message, args, client) {
        if (!config[message.guild.id]) config[message.guild.id] = {};
        switch (args[0]) {
            case 'prefix':
                message.channel.send(`Updating prefix to ${args[1]}`);
                config[message.guild.id]['prefix'] = args[1];
                writeToJSON();
                break;
        }

        function writeToJSON() {
            fs.writeFileSync('config.json', JSON.stringify(config), function (err) {
                if (err) return console.log(err);
                message.channel.send('Failed to write prefix to JSON file');
              });
        }
	},
};