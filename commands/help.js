const { prefix } = require('../config.json');
const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: 'List of all of my commands or info about a specific command',
    aliases: ['commands'],
    cooldown: 5,
    execute(message, args, client) {
        const data = []
        const { commands } = message.client;

        if (!args.length) {
            data.push(commands.map(command => command.name).join(', '));

            const embedHelp = new Discord.MessageEmbed()
                .setTitle('EVA Help Menu')
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`)
                .setTimestamp()
                .addFields(
                    { name: 'Here\'s a list of all my commands:\n', value: data},
                    { name: 'Command specific help:', value: 'You can send .help [command name] to get info on a specific command!' }
                )

            return message.author.send(embedHelp)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
                    }
        
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!')
        }

        const embedCommand = new Discord.MessageEmbed()
            .setTitle(`Command: ${prefix}${command.name}`)
            .setDescription(`**Aliases:** ${command.aliases}\n**Description:** ${command.description}\n**Cooldown:**${command.cooldown || 3}\n**Usage:** ${command.usage}\n**Sub Commands:**\n${command.subcommands || 'none'}\n**Examples:**\n${command.examples || 'none'}`)
            .setColor('#3498db')
            .setFooter(`Requested by ${message.author.username}`)
            .setTimestamp()

        message.channel.send(embedCommand);

    },
}