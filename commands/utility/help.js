let u = require('../../utils')

const Discord = require('discord.js')

let prefix = '!';
let helpChannel;
let channelType

module.exports = {
    name: 'help',
    description: 'List of all of my commands or info about a specific command',
    aliases: ['commands'],
    cooldown: 5,
    execute(message, args, client, member) {
        const data = []
        const commands = client.commands

        if (!member) {
            helpChannel = message.channel
            member = message.member
            channelType= message.channel.type
        } else {
            channelType = 'dm'
            helpChannel = member.guild.channels.cache.find(channel => channel.name === 'general')
        }

        if (!args.length) {
            data.push(commands.map(command => command.name).join(', '));

            const embedHelp = new Discord.MessageEmbed()
                .setTitle('EVA Help Menu')
                .setColor('#3498db')
                .setTimestamp()
                .addFields(
                    { name: 'Here\'s a list of all my commands:\n', value: data},
                    { name: 'Command specific help:', value: 'You can send .help [command name] to get info on a specific command!' }
                )

            return member.send(embedHelp)
                .then(() => {
                    if (channelType === 'dm') return;
                        message.channel.send(u.embed('I\'ve sent you a DM with all my commands!', '#00D166'));
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${member.tag}.\n`, error);
                    helpChannel.send(u.embed('It seems like I can\'t DM you! Do you have DMs disabled?', '#EB403B'));
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