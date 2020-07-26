const discord = require('discord.js')
let prefix = require('../index.js').prefix;

module.exports = {
	name: 'rps',
    description: 'Interact with the game of rock paper scissors.',
    args: true,
    usage: '<action>',
    aliases: [],
    guildOnly: false,
    cooldown: 0,
	execute(message, args, client) {
        switch (require('./game-status.js').games[message.author.id].game_stage) {
            case 0:
                switch (message.author.id) {
                    case require('./game-status.js').games[message.author.id].player_two: 
                    let game_status = require('./game-status.js')
                        switch (args[0]) {
                            case 'accept':
                                prefix = require('../index.js').prefix;
                                require('./game-status.js').set_player_two('accepted', true, message.author.id)
                                const game_starting_embed = new discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setTitle('Rock paper scissors game: (' + client.users.cache.get(game_status.games[message.author.id].player_one).username + ' vs ' + client.users.cache.get(game_status.games[message.author.id].player_two).username + ') has started.')
                                .setDescription('Please enter ' + prefix + 'rps rock, ' + prefix + 'rps paper or ' + prefix + 'rps scissors')
                                .setTimestamp()
                                .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
                                client.users.cache.get(game_status.games[message.author.id].player_one).send(game_starting_embed)
                                client.users.cache.get(game_status.games[message.author.id].player_two).send(game_starting_embed)
                                game_status.set_player_two('game_stage', 1, message.author.id)
                                game_status = require('./game-status')
                                break;
                            case 'decline':
                                const game_declined_embed = new discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setTitle(message.author.username + ' has declined the rock paper scissors game: (' + client.users.cache.get(game_status.games[message.author.id].player_one).username + ' vs ' + client.users.cache.get(game_status.games[message.author.id].player_two).username + ')')
                                .setTimestamp()
                                .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
                                client.users.cache.get(game_status.games[message.author.id].player_one).send(game_declined_embed)
                                message.author.send(game_declined_embed)
                                game_status.reset(require('./game-status.js').games[message.author.id].player_one, game_status.games[message.author.id].player_two)
                                break;
                        }
                        break;  
                }
                break;
            case 1:
                const game_status = require('./game-status.js')
                switch (message.author.id) {
                    case game_status.games[message.author.id].player_one:
                        let player_one_input = args[0].toLowerCase()
                        if (player_one_input == 'rock' || player_one_input == 'paper' || player_one_input == 'scissors') {
                            game_status.set_player_one('player_one_input_code', rps_editor(player_one_input), message.author.id)
                            game_status.set_player_one('player_one_inputed', true, message.author.id)
                            const input_embed = new discord.MessageEmbed()
                            .setColor('#00ff00')
                            .setTitle(player_one_input[0].toUpperCase() + player_one_input.slice(1) + ' selected')
                            .setTimestamp()
                            .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
                            message.author.send(input_embed)
                            evaluate_game(message, client)
                        }
                        else {
                            const error_embed = new discord.MessageEmbed()
                            .setColor('#00ff00')
                            .setTitle('Please enter Rock, Paper or scissors')
                            .setTimestamp()
                            .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
                            message.author.send(error_embed)
                        }
                        break;
                    case game_status.games[message.author.id].player_two:
                        let player_two_input = args[0].toLowerCase()
                        if (player_two_input == 'rock' || player_two_input == 'paper' || player_two_input == 'scissors') {
                            game_status.set_player_two('player_two_input_code', rps_editor(player_two_input), message.author.id)
                            game_status.set_player_two('player_two_inputed', true, message.author.id)
                            const input_embed = new discord.MessageEmbed()
                            .setColor('#00ff00')
                            .setTitle(player_two_input[0].toUpperCase() + player_two_input.slice(1) + ' selected')
                            .setTimestamp()
                            .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
                            message.author.send(input_embed)
                            evaluate_game(message, client)
                        }
                        else {
                            const error_embed = new discord.MessageEmbed()
                            .setColor('#00ff00')
                            .setTitle('Please enter Rock, Paper or scissors')
                            .setTimestamp()
                            .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
                            message.author.send(error_embed)
                        }
                        break;
                }
                break;
        }
    }
};

function rps_editor(input) {
    if (input == 'rock') return 0;
    if (input == 'paper') return 1;
    if (input == 'scissors') return 2;
}

function rps_back_editor(input) {
    if (input == 0) return 'Rock';
    if (input == 1) return 'Paper';
    if (input == 2) return 'Scissors';
}

function evaluate_game(message, client) {   
    let game_status = require('./game-status.js')
    if (game_status.games[message.author.id].player_one_inputed && game_status.games[message.author.id].player_two_inputed) {
        const player_one_win = new discord.MessageEmbed()
            .setTitle(client.users.cache.get(game_status.games[message.author.id].player_one).username + ' won!')
            .setColor('#FFFFF')
            .setImage(client.users.cache.get(game_status.games[message.author.id].player_one).displayAvatarURL({ dynamic: true }))
            .addFields(
                {name: client.users.cache.get(game_status.games[message.author.id].player_one).username, value: rps_back_editor(game_status.games[message.author.id].player_one_input_code), inline: true},
                {name: client.users.cache.get(game_status.games[message.author.id].player_two).username, value: rps_back_editor(game_status.games[message.author.id].player_two_input_code), inline: true}
            )
        const player_two_win = new discord.MessageEmbed()
            .setTitle(client.users.cache.get(game_status.games[message.author.id].player_two).username + ' won!')
            .setColor('#FFFFF')
            .setImage(client.users.cache.get(game_status.games[message.author.id].player_two).displayAvatarURL({ dynamic: true }))
            .addFields(
                {name: client.users.cache.get(game_status.games[message.author.id].player_one).username, value: rps_back_editor(game_status.games[message.author.id].player_one_input_code), inline: true},
                {name: client.users.cache.get(game_status.games[message.author.id].player_two).username, value: rps_back_editor(game_status.games[message.author.id].player_two_input_code), inline: true}
            )
        const player_draw = new discord.MessageEmbed()
            .setTitle('You drew!')
            .setColor('#FFFFF')
            .addFields(
                {name: client.users.cache.get(game_status.games[message.author.id].player_one).username, value: rps_back_editor(game_status.games[message.author.id].player_one_input_code), inline: true},
                {name: client.users.cache.get(game_status.games[message.author.id].player_two).username, value: rps_back_editor(game_status.games[message.author.id].player_two_input_code), inline: true}
            )
        let player_one_input_code = game_status.games[message.author.id].player_one_input_code
        let player_two_input_code = game_status.games[message.author.id].player_two_input_code
        if (player_one_input_code == 2 && player_two_input_code == 0) {client.users.cache.get(game_status.games[message.author.id].player_one).send(player_two_win); client.users.cache.get(game_status.games[message.author.id].player_two).send(player_two_win)}
        if (player_one_input_code == 1 && player_two_input_code == 0) {client.users.cache.get(game_status.games[message.author.id].player_one).send(player_one_win); client.users.cache.get(game_status.games[message.author.id].player_two).send(player_one_win)}
        if (player_one_input_code == 0 && player_two_input_code == 0) {client.users.cache.get(game_status.games[message.author.id].player_one).send(player_draw); client.users.cache.get(game_status.games[message.author.id].player_two).send(player_draw)}
        if (player_one_input_code == 2 && player_two_input_code == 1) {client.users.cache.get(game_status.games[message.author.id].player_one).send(player_one_win); client.users.cache.get(game_status.games[message.author.id].player_two).send(player_one_win)}
        if (player_one_input_code == 1 && player_two_input_code == 1) {client.users.cache.get(game_status.games[message.author.id].player_one).send(player_draw); client.users.cache.get(game_status.games[message.author.id].player_two).send(player_draw)}
        if (player_one_input_code == 0 && player_two_input_code == 1) {client.users.cache.get(game_status.games[message.author.id].player_one).send(player_two_win); client.users.cache.get(game_status.games[message.author.id].player_two).send(player_two_win)}
        if (player_one_input_code == 2 && player_two_input_code == 2) {client.users.cache.get(game_status.games[message.author.id].player_one).send(player_draw); client.users.cache.get(game_status.games[message.author.id].player_two).send(player_draw)}
        if (player_one_input_code == 1 && player_two_input_code == 2) {client.users.cache.get(game_status.games[message.author.id].player_one).send(player_two_win); client.users.cache.get(game_status.games[message.author.id].player_two).send(player_two_win)}
        if (player_one_input_code == 0 && player_two_input_code == 2) {client.users.cache.get(game_status.games[message.author.id].player_one).send(player_one_win); client.users.cache.get(game_status.games[message.author.id].player_two).send(player_one_win)}
        game_status.reset(game_status.games[message.author.id].player_one, game_status.games[message.author.id].player_two)
        game_status = require('./game-status.js')
        return;
    }
}