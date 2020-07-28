module.exports = {
	name: 'stop',
	description: 'Stops the current song and leaves the voice channel.',
	aliases: ['leave'],
	cooldown: 5,
	guildOnly: true,
	execute(message, args, client) {
		if (!message.member.voice.channel) return message.reply('You must be in a voice channel to run that command')
		if (!message.guild.musicData.isPlaying) return message.reply('There is not a song currently playing')
		message.member.voice.channel.leave();
		message.guild.musicData.queue.length = 0
		message.guild.musicData.isPlaying = false;
		message.guild.musicData.nowPlaying = null;
		message.guild.musicData.queue = [];
    }
}