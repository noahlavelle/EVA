const { parse } = require("path")

module.exports = {
	name: 'loop',
    description: 'Loops the current song a given number of times.',
    args: true,
    usage: '<loop number>',
	cooldown: 5,
	guildOnly: true,
	execute(message, args, client) {
		if (!message.member.voice.channel) return message.reply('You must be in a voice channel to run that command')
        if (!message.guild.musicData.isPlaying) return message.reply('There is not a song currently playing')
        for (let i = 0; i <= parseInt(args[0]) - 1; i++) {
            message.guild.musicData.queue.unshift(message.guild.musicData.nowPlaying);
        }

        message.reply(`Looped the song ${message.guild.musicData.nowPlaying.title} ${args[0]} times.`)
    }
}