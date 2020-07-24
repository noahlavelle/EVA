const fs = require('fs');
const Discord = require('discord.js');
const {
    prefix,
    token
} = require('./config.json');
const { subcommands } = require('./commands/announce');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity(prefix + 'help', {type:'PLAYING'})
    require('./commands/game-status.js').reset();
    require('./commands/game-status.js').games = [1];
});

client.on('guildMemberAdd', member => {
    member.roles.add(member.guild.roles.cache.find(r => r.name === 'Member'))
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            const usageEmbed = new Discord.MessageEmbed()
                .setTitle(`Command: ${prefix}${command.name}`)
                .setDescription(`**Aliases:** ${command.aliases}\n**Description:** ${command.description}\n**Cooldown:**${command.cooldown || 3}\n**Usage:** ${command.usage}\n**Sub Commands:**\n${command.subcommands || 'none'}\n**Examples:**\n${command.examples || 'none'}`)
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`)
                .setTimestamp()
            reply = usageEmbed;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

if (process.env.DEBUG) {
    console.log('Running in debug mode');
    process.on('unhandledRejection', e => { throw e });
}

client.login(token);
