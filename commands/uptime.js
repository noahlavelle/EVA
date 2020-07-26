let u = require('../utils')

const moment = require("moment");
require("moment-duration-format");

module.exports = {
	name: 'uptime',
    description: 'Displays the server uptime.',
    cooldown: 5,
	execute(message, args, client) {
        message.channel.send(u.titleEmbed(moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]"), '#3498db', ':signal_strength: Uptime:'));
    }
};