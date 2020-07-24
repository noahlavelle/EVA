const discord = require('discord.js')

module.exports = {
	name: 'rps',
    description: 'Interact with the game of rock paper scissors.',
    args: false,
    usage: '<action>',
    aliases: [],
    guildOnly: false,
	execute(message, args, client) {
        let game_status = require('./game-status')
        function play_game_rps(game_stage) {
            switch (game_stage) {
                case 0:
                    switch (message.author.id) {
                        case game_status.games[message.author.id].player_two: 
                            switch (args[0]) {
                                case 'accept':
                                    const game_starting_embed = new discord.MessageEmbed()
                                    .setColor('#00ff00')
                                    .setTitle('Rock paper scissors game: (' + client.users.cache.get(game_status.games[message.author.id].player_one).username + ' vs ' + client.users.cache.get(game_status.games[message.author.id].player_two).username + ') has started.')
                                    .setTimestamp()
                                    .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
                                    client.users.cache.get(game_status.games[message.author.id].player_one).send(game_starting_embed)
                                    client.users.cache.get(game_status.games[message.author.id].player_two).send(game_starting_embed)
                                    break;
                            }
                            break;  
                    }
                    break;
            }
        }
        play_game_rps(game_status.games[message.author.id].game_stage)
    }
};