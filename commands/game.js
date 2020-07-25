const discord = require('discord.js');
const {
    prefix
} = require('../config.json');

module.exports = {
	name: 'game',
    description: 'Play a game.',
    args: true,
    usage: '<user> <game>',
    aliases: ['play', 'games', 'challenge'],
    guildOnly: true,
	execute(message, args, client) {
        switch (args[1]) {
            case 'rps':
                let game_status = require('./game-status.js')
                game_status.add(message.author.id, args[0].replace(/[^0-9]/g , ''), 'rps')
                game_status = require('./game-status.js')
                rps_embed = new discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('You have been challenged to a game of rock paper scissors by ' + message.author.username)
                .addFields(
                    {name: 'Please enter ' + prefix + 'rps accept or ' + prefix + 'rps decline', value: 'You have a minute to respond'}
                )
                .setTimestamp()
                .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
                client.users.cache.get(args[0].replace(/[^0-9]/g , '')).send(rps_embed);
                break;                
        }
    }
};
