let u = require('../../utils')

const fetch = require('node-fetch');

module.exports = {
	name: 'chucknorris',
    description: 'Gives you a joke about Chuck Norris.',
    aliases: ['chuck'],
	execute(message, args, client) {
        fetch('http://api.icndb.com/jokes/random?')
            .then(res => res.json())
            .then(json => message.channel.send(u.titleEmbed(json.value.joke, '#3498db', 'Chuck Norris Joke:')))
            .catch(err => {
                message.channel.send('We could not find Chuck Norris :confused:');
                return console.error(err);
            })
	},
};