let u = require('../utils')

const { tenorAPI } = require('../config.json')
const fetch = require('node-fetch');


module.exports = {
	name: 'cat',
    description: 'Sends a cute cat photo',
    cooldown: 5,
    aliases: ['kitten'],
	execute(message, args, client) {
        fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=cat&limit=1`)
        .then(res => res.json())
        .then(json => message.channel.send(json.results[0].url))
        .catch(err => {
          message.channel.send('Request to find a kitty failed :(');
          return console.error(err);
        });
	}
};