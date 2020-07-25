let u = require('../utils')

const fetch = require('node-fetch');

module.exports = {
	name: 'joke',
    description: 'Gives you a random joke.',
	execute(message, args, client) {
        fetch('https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,racist,sexist')
            .then(res => res.json())
            .then(json => {
                if (json.setup) message.channel.send(u.titleEmbed(`${json.setup}\n${json.delivery}`, '#3498db', 'Random Joke:')); else {
                    message.channel.send(u.titleEmbed(`${json.joke}`, '#3498db', 'Random Joke:'));
                }
            })
            .catch(err => {
                message.channel.send('We could not find Chuck Norris :confused:');
                return console.error(err);
            })
	},
};