const { writeFileSync } = require('fs')
const config = require('../../config.json')

module.exports = {
	name: 'custom',
    description: 'Customises the bot to suit the server better',
    args: true,
    usage: '<what-is-changed> <value>',
    subcommands: `custom prefix <value> - Changes prefix\n custom staffroles <role, role, role etc.> - Sets roles that cannot be set by bots without user having admin\n custom default-role <role> - Changes the role given to new users`,
    userPermissions: ['ADMINISTRATOR'],
    aliases: ['change', 'vars'],
    guildOnly: true,
	execute(message, args, client) {
        switch (args[0]) {
            case 'prefix':
                message.channel.send(`Changed prefix to ${args[1]}`);
                config[message.guild.id]['prefix'] = args[1];
                writeToJSON();
                break;
            default:
                message.channel.send('That value is not changable')
                break;
        }

        function writeToJSON() {
            writeFileSync('config.json', JSON.stringify(config), function (err) {
                if (err) return console.log(err);
                message.channel.send('Failed to write prefix to JSON file');
              });
        }
	},
};