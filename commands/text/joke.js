const fetch = require('node-fetch');

module.exports = {
	name: 'joke',
    description: 'Gives you a random joke.',
	execute(message, args, client) {
        fetch('https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,racist,sexist')
            .then(res => res.json())
            .then(json => {
                if (json.setup) message.channel.send(`${json.setup}\n${json.delivery}`); else {
                    message.channel.send(`${json.joke}`);
                }
            })
            .catch(err => {
                message.channel.send('We could not find Chuck Norris :confused:\nIf you think you have found a bug or glitch, please report it on the offical EVABot discord: https://discord.gg/MRaZTwJ');
                return console.error(err);
            })
	},
};