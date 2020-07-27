let u = require('../../utils')

const fetch = require('node-fetch');

module.exports = {
	name: 'fortune',
    description: 'Gives you a fortune cookie message',
    aliases: ['fortunecookie'],
	execute(message, args, client) {
        fetch('http://yerkee.com/api/fortune')
            .then(res => res.json())
            .then(json => message.channel.send(u.titleEmbed(json.fortune, '#3498db', 'Your Fortune:')))
            .catch(err => {
                message.channel.send('We could not find you a fortune :confused:');
                return console.error(err);
            })
	},
};