let u = require('../utils')

module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['latency', 'ms'],
    cooldown: 5,
	execute(message, args, client) {
		message.channel.send("Pinging...").then(m =>{
			var ping = m.createdTimestamp - message.createdTimestamp;
			m.delete();
			message.channel.send(u.titleEmbed(`Your Ping is: ${ping}ms`, '#3498db', ':ping_pong:  Pong!'));
        });
	},
};