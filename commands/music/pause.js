module.exports = {
	name: 'pause',
	description: 'Pauses the current song.',
	aliases: ['hold'],
	cooldown: 0,
	guildOnly: true,
	execute(message, args, client) {
		if (!message.member.voice.channel) return message.reply('You must be in a voice channel to run that command')
		if (!message.guild.musicData.isPlaying) return message.reply('There is not a song currently playing')
        message.guild.musicData.songDispatcher.pause();
        message.reply(':pause_button: The song has been paused');
    }
}