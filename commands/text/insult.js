let u = require('../../utils')
let tag;
let embed;

const fetch = require('node-fetch');

module.exports = {
	name: 'insult',
    description: 'Gives an evil insult or insults someone',
    usage: '<@user>',
    aliases: ['burn', 'roast'],
	execute(message, args, client) {
        if (args[0] && args[0].includes('@')) {
            tag = args[0]
        } else {
            tag = ''
        }
        fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
            .then(res => res.json())
            .then(json => embed = u.titleEmbed(`:fire: ${json.insult}`, '#3498db', 'Evil Insult:'))
            .then(() => message.channel.send(tag, embed))
            .catch(err => {
                message.channel.send('We could not find you an evil insult :confused:');
                return console.error(err);
            })
	},
};