const { readdirSync, writeFileSync } = require("fs");
const Discord = require('discord.js');
const { Structures } = require('discord.js');
const config = require('./config.json');
const help = require('./commands/utility/help');
const Enmap = require('enmap');
const { sep } = require("path");
require('./commands/games/game-status.js').games = [1];
require('./commands/games/game-status.js').players = [1];
const token = config.token

Structures.extend('Guild', Guild => {
    class MusicGuild extends Guild {
      constructor(client, data) {
        super(client, data);
        this.musicData = {
          queue: [],
          isPlaying: false,
          volume: 1,
          songDispatcher: null
        };
      }
    }
    return MusicGuild;
  });

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
});

const defaultSettings = {
    prefix: "!",
    joinRole: "Member",
    jokeFilters: "nsfw,religious,political,racist,sexist",
}

module.exports.defaultSettings = defaultSettings

readdirSync('./commands/').forEach(dirs => {
    const commandFiles = readdirSync(`./commands/${sep}/${dirs}${sep}`)
    for (const file of commandFiles) {
        const pull = require(`./commands/${dirs}/${file}`);
        if (typeof pull.name !== 'undefined') {
            client.commands.set(pull.name, pull);
        }
    }
})

const cooldowns = new Discord.Collection();

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('!' + 'help', {type:'PLAYING'})
});

client.on("guildDelete", guild => {
    client.settings.delete(guild.id);
});

client.on('guildMemberAdd', member => {
    help.execute('', [], client, member)
    client.settings.ensure(member.guild.id, defaultSettings);
    let joinRole = client.settings.get(member.guild.id, "joinRole");
    member.roles
        .add(member.guild.roles.cache.find(r => r.name === joinRole))
        .catch(e => console.error(e))

});

client.on("guildCreate", guild => {    
    const join_embed = new Discord.MessageEmbed()
    .setTitle(`Thanks for adding me to your server ${guild.name}, my deafult prefix is ` + '`.`')
    .setDescription('Type `.help` to see a list of commands')
    .setColor('#3498db')
    .setTimestamp()
    guild.owner.send(join_embed)
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});


client.on('message', message => {
    let prefix;
    if (message.channel.type === 'dm') prefix = defaultSettings.prefix; else prefix = client.settings.get(message.guild.id, "prefix")
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.split(/\s+/g);
    const commandName = args.shift().slice(prefix.length).toLowerCase();
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.userPermissions) {
        for (permission in command.userPermissions) {
            if(!message.member.hasPermission(command.userPermissions[permission])) return message.reply('You do not have permissions to run that command.')
        }
    }

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply(errorEmbed('I can\'t execute that command inside DMs!', '#EB403B'));
    }

    if (command.args && !args.length) {
        let reply = errorEmbed(`You didn't provide any arguments, ${message.author}!`, '#EB403B');

        if (command.usage) {
            const usageEmbed = new Discord.MessageEmbed()
                .setTitle(`Command: ${prefix}${command.name}`)
                .setDescription(`**Aliases:** ${command.aliases || 'none'}\n**Description:** ${command.description}\n**Cooldown:** ${command.cooldown || 3}\n**Usage:** ${command.usage || 'none'}\n**Sub Commands:**\n${command.subcommands || 'none'}\n**Examples:**\n${command.examples || 'none'}`)
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
        message.reply(errorEmbed('There was an error trying to execute that command!'));
    }
});

if (process.env.DEBUG) {
    console.log('Running in debug mode');
    process.on('unhandledRejection', e => { throw e });
}

function errorEmbed(errorMessage) {
    const embedError = new Discord.MessageEmbed()
        .setColor('#EB403B ')
        .setDescription(errorMessage)
    return embedError
}

function handleDMs() {
    let prefix = client.defaultSettings.prefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.split(/\s+/g);
    const commandName = args.shift().slice(prefix.length).toLowerCase();
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

}

client.login(token);