module.exports = {
	name: 'queue',
	description: 'Shows the first 10 items in the queue.',
	cooldown: 10,
	guildOnly: true,
	execute(message, args, client) {
		if (!message.member.voice.channel) return message.reply('You must be in a voice channel to run that command')
        if (!message.guild.musicData.isPlaying) return message.reply('There is not a song currently playing')
        let queueMessage = '';
        let length;
        if (message.guild.musicData.queue.length > 10) length = 9; else length = message.guild.musicData.queue.length - 1
        for (song in message.guild.musicData.queue) {
            if (song <= length) {
                queueMessage += `${message.guild.musicData.queue[song].title}${song == length ? '' : ', '}`;
                if (song == length) message.reply(queueMessage)
            }
        }
        
    }
}