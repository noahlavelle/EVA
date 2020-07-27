let u = require('../../utils')

const fetch = require('node-fetch');

module.exports = {
	name: 'fact',
    description: 'Gives you a fun, random fact.',
    aliases: ['funfact'],
	execute(message, args, client) {
        fetch('https://uselessfacts.jsph.pl/random.json?language=en')
            .then(res => res.json())
            .then(json => message.channel.send(u.titleEmbed(json.text, '#3498db', 'Fun Fact:')))
            .catch(err => {
                message.channel.send('We could not find you a fortune :confused:');
                return console.error(err);
            })
	},
};