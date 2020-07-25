let u = require('../../utils')

const Discord = require('discord.js')

let prefix = '!';

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
                    message.channel.send(u.embed('I\'ve sent you a DM with all my commands!', '#00D166'));
                }).catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.channel.send(u.embed('It seems like I can\'t DM you! Do you have DMs disabled?', '#EB403B'));
                });
                    }
        
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.channel.send(embed('That\'s not a valid command!', '#EB403B'))
        }

        message.channel.send(u.titleEmbed(`**Aliases:** ${command.aliases || 'none'}\n**Description:** ${command.description || 'none'}\n**Cooldown:** ${command.cooldown || 3}\n**Usage:** ${command.usage || 'none'}\n**Sub Commands:**\n${command.subcommands || 'none'}\n**Examples:**\n${command.examples || 'none'}`,
        '#3498db', `Command: ${prefix}${command.name}`))
    },
}