module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['latency', 'ms'],
    cooldown: 5,
	execute(message, args, client) {
		message.channel.send('Pong!').then(m =>{
			var ping = m.createdTimestamp - message.createdTimestamp;
			hi()
			m.edit('Pong! ``' + ping + 'ms``');
		async function hi() {
		}
        });
	},
};