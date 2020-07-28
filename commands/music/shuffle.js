module.exports = {
	name: 'shuffle',
	description: 'Shuffles the queue',
	aliases: ['scramble'],
	cooldown: 0,
	guildOnly: true,
	execute(message, args, client) {
		if (!message.member.voice.channel) return message.reply('You must be in a voice channel to run that command')
		if (!message.guild.musicData.isPlaying) return message.reply('There is not a song currently playing')
        for(let i = message.guild.musicData.queue.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = message.guild.musicData.queue[i]
            message.guild.musicData.queue[i] = message.guild.musicData.queue[j]
            message.guild.musicData.queue[j] = temp
          }
        message.reply('Shuffled the queue.')
    }
}