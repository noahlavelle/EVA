let u = require('../../utils')

const fs = require('fs')
const config = require('../../config.json')

module.exports = {
	name: 'custom',
    description: 'Customises the bot to suit the server better',
    args: true,
    usage: '<what-is-changed> <value>',
    subcommands: `custom prefix <value> - Changes prefix\n custom staffroles <role, role, role etc.> - Sets roles that cannot be set by bots without user having admin\n custom default-role <role> - Changes the role given to new users`,
    aliases: ['change', 'vars'],
    guildOnly: true,
	execute(message, args, client) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(u.embed('You do not have permission to use this command.', '#EB403B'))
        if (!config[message.guild.id]) config[message.guild.id] = {};
        switch (args[0]) {
            case 'prefix':
                message.channel.send(u.embed(`Changed prefix to ${args[1]}`, '#00D166'));
                config[message.guild.id]['prefix'] = args[1];
                writeToJSON();
                break;
            default:
                message.channel.send(u.embed('That value is not changable', '#EB403B'))
                break;
        }

        function writeToJSON() {
            fs.writeFileSync('config.json', JSON.stringify(config), function (err) {
                if (err) return console.log(err);
                message.channel.send(u.embed('Failed to write prefix to JSON file', '#EB403B'));
              });
        }
	},
};