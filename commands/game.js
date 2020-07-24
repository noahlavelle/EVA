game_status = require('./game-status.js')

module.exports = {
	name: 'game',
    description: 'Play a game.',
    args: true,
    usage: '<user> <game>',
    aliases: ['play'],
    guildOnly: true,
	execute(message, args, client) {
        switch args[2] {
            case 'rps':
                game_status
                break;
        }
	},
};