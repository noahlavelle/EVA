const Enmap = require('enmap');
const index = require('../../index')

module.exports = {
	name: 'showconfig',
    description: 'Shows the servers configurations',
    aliases: ['showsettings'],
    guildOnly: true,
	execute(message, args, client) {
        let configProps = Object.keys(index.guildConf).map(prop => {
            return `${prop}  :  ${index.guildConf[prop]}`;
          });
          message.channel.send(`The following are the server's current configuration:
          \`\`\`${configProps.join("\n")}\`\`\``);
	},
};