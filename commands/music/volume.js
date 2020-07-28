module.exports = {
	name: 'volume',
	description: 'Sets the volume to a given percentage.',
	cooldown: 0,
	guildOnly: true,
	execute(message, args, client) {
		if (!message.member.voice.channel) return message.reply('You must be in a voice channel to run that command')
        if (!message.guild.musicData.isPlaying) return message.reply('There is not a song currently playing')
        var volume = args[0] / 100;
        message.guild.musicData.volume = volume;
        message.guild.musicData.songDispatcher.setVolume(volume);
        message.reply(`Set the volume to ${args[0]}%.`)
    }
}