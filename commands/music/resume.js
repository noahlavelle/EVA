module.exports = {
	name: 'resume',
	description: 'Resumes the current song.',
	aliases: ['continue'],
	cooldown: 0,
	guildOnly: true,
	execute(message, args, client) {
		if (!message.member.voice.channel) return message.reply('You must be in a voice channel to run that command')
		if (!message.guild.musicData.isPlaying) return message.reply('There is not a song currently playing')
        message.guild.musicData.songDispatcher.resume();
        message.reply(':play_button: The song has been resumed');
    }
}