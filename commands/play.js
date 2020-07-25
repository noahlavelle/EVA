const Discord = require('discord.js')
const ytdl = require('ytdl-core')

var servers = {}

module.exports = {
	name: 'play',
    description: 'Plays a of with a given URL',
    args: true,
    usage: '<url> ',
    examples: 'play https://a-song-url-here',
    aliases: ['song'],
    guildOnly: true,
    execute(message, args, client) {
        function play(connection, message) {
            exports.Servers = servers;
            var server = servers[message.guild.id];
            server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}))
            server.dispatcher.on('finish', () => {
                server.queue.shift();
                if (server.queue[0]) {
                    play(connection, message);
                } else {
                    connection.disconnect();
                }
            })
        }

        if (!message.member.voice.channel) return message.channel.send(embed('You must be in a channel to play songs.', '#EB403B'))
        if (!servers[message.guild.id]) servers[message.guild.id]= {
            queue: []
        }
        var server = servers[message.guild.id]
        server.queue.push(args[0]);
        if (!message.member.voice.connection) message.member.voice.channel.join().then((connection) => {
            play(connection, message);
        })

        function embed(message, color) {
            const embedError = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(message)
            return embedError
        }    
	},
};