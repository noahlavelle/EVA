let u = require('../../utils')

const { tenorAPI } = require('../../config.json')
const fetch = require('node-fetch');


module.exports = {
	name: 'gif',
    description: 'Searches for a gif of a given name',
    usage: '<gif-name>',
    cooldown: 5,
	execute(message, args, client) {
        fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=${args[0]}&limit=1`)
        .then(res => res.json())
        .then(json => message.channel.send(json.results[0].url))
        .catch(err => {
          message.channel.send('Could not find a gif of that name\nIf you think you have found a bug or glitch, please report it on the offical EVABot discord: https://discord.gg/MRaZTwJ');
          return console.error(err);
        });
	}
};