const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'playing',
    aliases: ['nowplaying', 'song'],
	description: 'Shows what song is currently playing and the next song if available',
	cooldown: 5,
	execute(message, args, client) {
		if (!message.member.voice.channel) return message.reply('You must be in a voice channel to run that command')
        if (!message.guild.musicData.isPlaying) return message.reply('There is not a song currently playing'); else if (message.guild.musicData.nowPlaying) {
            const videoEmbed = new MessageEmbed()
                .setThumbnail(message.guild.musicData.thumbnail)
                .setColor('#3498db')
                .addFields(
                    { name: 'Now Playing:', value: message.guild.musicData.nowPlaying.title },
                    { name: 'Duration:', value: message.guild.musicData.nowPlaying.duration }
                )
            if (message.guild.musicData.queue[0]) videoEmbed.addField('Next Up:', message.guild.musicData.queue[0])
            message.reply(videoEmbed)
        }

    }
        
}