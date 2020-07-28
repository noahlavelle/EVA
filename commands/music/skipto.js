module.exports = {
	name: 'skipto',
	description: 'Skips to a certain queue number',
	cooldown: 0,
	guildOnly: true,
	execute(message, args, client) {
		if (!message.member.voice.channel) return message.reply('You must be in a voice channel to run that command')
		if (!message.guild.musicData.isPlaying) return message.reply('There is not a song currently playing')
		if (parseInt(args[0]) <! message.guild.musicData.queue.length) return message.reply('That queue position is not populated')
		for (let i = 0; i < parseInt(args[0]); i++) {
			message.guild.musicData.queue.shift();
			if (i == parseInt(args[0]) - 1)  {
				message.guild.musicData.songDispatcher.end();
				message.reply(`Skipped to queue number ${args[0]}.`)
			}
		}
    }
}