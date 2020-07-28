const discord = require('discord.js');

module.exports = {
	name: 'game',
    description: 'Play a game.',
    args: true,
    usage: '<user> <game>',
    aliases: ['play', 'games', 'challenge'],
    guildOnly: true,
	execute(message, args, client) {
        const prefix = client.settings.get(message.guild.id, "prefix")
        let game_status = require('./game-status.js')
        if (message.guild.members.cache.has(args[0].replace(/[^0-9]/g, ''))) {
            if (args[0].replace(/[^0-9]/g, '') != message.author.id) {
                if (!game_status.players.includes(message.author.id)) {
                    if (!game_status.players.includes(args[0].replace(/[^0-9]/g , ''))) {
                        switch (args[1]) {
                            case 'rps':
                                game_status.add(message.author.id, args[0].replace(/[^0-9]/g , ''), 'rps')
                                game_status = require('./game-status.js')
                                rps_embed = new discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setTitle('You have been challenged to a game of Rock, Paper, Scissors by ' + message.author.username)
                                .addFields(
                                    {name: 'Please enter ' + prefix + 'rps accept or ' + prefix + 'rps decline', value: 'You have a minute to respond'}
                                )
                                .setTimestamp()
                                .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
                                client.users.cache.get(args[0].replace(/[^0-9]/g , '')).send(rps_embed);
                                message.channel.send(game_challenge_rps(message, client))
                                setTimeout(function() {
                                    if (!require('./game-status.js').games[message.author.id].accepted) {
                                        const timed_out_embed = new discord.MessageEmbed()
                                        .setColor('#00ff00')
                                        .setTitle(message.author.username + "'s request has timed out to the Rock, Paper, Scissors game: (" + client.users.cache.get(game_status.games[message.author.id].player_one).username + ' vs ' + client.users.cache.get(game_status.games[message.author.id].player_two).username + ')')
                                        .setTimestamp()
                                        .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
                                        message.author.send(timed_out_embed)
                                        client.users.cache.get(game_status.games[message.author.id].player_two).send(timed_out_embed)
                                        game_status.reset(message.author.id, game_status.games[message.author.id].player_two)
                                    }}, 60000)
                                setTimeout(function() {
                                    if (require('./game-status.js').games[message.author.id].playing_game) {
                                        const timed_out_embed = new discord.MessageEmbed()
                                        .setColor('#00ff00')
                                        .setTitle(message.author.username + "'s Rock, Paper, Scissors game has time out (" + client.users.cache.get(game_status.games[message.author.id].player_one).username + ' vs ' + client.users.cache.get(game_status.games[message.author.id].player_two).username + ')')
                                        .setTimestamp()
                                        .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
                                        message.author.send(timed_out_embed)
                                        client.users.cache.get(game_status.games[message.author.id].player_two).send(timed_out_embed)
                                        game_status.reset(message.author.id, game_status.games[message.author.id].player_two)
                                    }}, 300000)
                                    break;
                            case 'ttt':
                                game_status.add(message.author.id, args[0].replace(/[^0-9]/g , ''), 'ttt')
                                game_status = require('./game-status.js')
                                ttt_embed = new discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setTitle('You have been challenged to a game of Tic, Tac, Toe by ' + message.author.username)
                                .addFields(
                                    {name: 'Please enter ' + prefix + 'ttt accept or ' + prefix + 'ttt decline', value: 'You have a minute to respond'}
                                )
                                .setTimestamp()
                                .setThumbnail('https://images.squarespace-cdn.com/content/v1/54f74f23e4b0952b4e0011c0/1580269334204-W1N8ATYATHA6XP02YVSY/ke17ZwdGBToddI8pDm48kGtxPgPaOBG5VTwzK0O3JPx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmYfwwyaF2qdqpAEW-vwkS-q9yrvcVcBFNcMZ7RZJD-G-L7L3_iLqMJNwF1D5UY19g/tictac.png?format=1500w')
                                client.users.cache.get(args[0].replace(/[^0-9]/g , '')).send(ttt_embed);
                                message.channel.send(game_challenge_ttt(message, client))
                                setTimeout(function() {
                                    if (!require('./game-status.js').games[message.author.id].accepted) {
                                        const timed_out_embed = new discord.MessageEmbed()
                                        .setColor('#00ff00')
                                        .setTitle(message.author.username + "'s request has timed out to the Tic, Tac, Toe game: (" + client.users.cache.get(game_status.games[message.author.id].player_one).username + ' vs ' + client.users.cache.get(game_status.games[message.author.id].player_two).username + ')')
                                        .setTimestamp()
                                        .setThumbnail('https://images.squarespace-cdn.com/content/v1/54f74f23e4b0952b4e0011c0/1580269334204-W1N8ATYATHA6XP02YVSY/ke17ZwdGBToddI8pDm48kGtxPgPaOBG5VTwzK0O3JPx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmYfwwyaF2qdqpAEW-vwkS-q9yrvcVcBFNcMZ7RZJD-G-L7L3_iLqMJNwF1D5UY19g/tictac.png?format=1500w')
                                        message.author.send(timed_out_embed)
                                        client.users.cache.get(game_status.games[message.author.id].player_two).send(timed_out_embed)
                                        game_status.reset(message.author.id, game_status.games[message.author.id].player_two)
                                    }}, 60000)
                                setTimeout(function() {
                                    if (require('./game-status.js').games[message.author.id].playing_game) {
                                        const timed_out_embed = new discord.MessageEmbed()
                                        .setColor('#00ff00')
                                        .setTitle(message.author.username + "'s Tic, Tac, Toe game has time out (" + client.users.cache.get(game_status.games[message.author.id].player_one).username + ' vs ' + client.users.cache.get(game_status.games[message.author.id].player_two).username + ')')
                                        .setTimestamp()
                                        .setThumbnail('https://images.squarespace-cdn.com/content/v1/54f74f23e4b0952b4e0011c0/1580269334204-W1N8ATYATHA6XP02YVSY/ke17ZwdGBToddI8pDm48kGtxPgPaOBG5VTwzK0O3JPx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmYfwwyaF2qdqpAEW-vwkS-q9yrvcVcBFNcMZ7RZJD-G-L7L3_iLqMJNwF1D5UY19g/tictac.png?format=1500w')
                                        message.author.send(timed_out_embed)
                                        client.users.cache.get(game_status.games[message.author.id].player_two).send(timed_out_embed)
                                        game_status.reset(message.author.id, game_status.games[message.author.id].player_two)
                                    }}, 300000)
                                break;
                        }
                    }
                    else {
                        const error_embed = new discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle(client.users.cache.get(args[0].replace(/[^0-9]/g , '')).username + ' is already playing another game!')
                        .setDescription("Wait for they're game to finish then type the command again.")
                        .setTimestamp()
                        message.channel.send(error_embed)
                    }
                }
                else {
                    const error_embed = new discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle(client.users.cache.get(message.author.id).username + ', you are already playing another game!')
                    .setDescription("Wait for the game to finish then type the command again.")
                    .setTimestamp()
                    message.channel.send(error_embed)
                }
            }
            else {
                const error_embed = new discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle(client.users.cache.get(message.author.id).username + ", you can't challenge your self!")
                    .setDescription("Type the command again but this time, put someone else in.")
                    .setTimestamp()
                    message.channel.send(error_embed)
            }
        }
        else {
            const error_embed = new discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle("That player doesn't exist!")
                    .setDescription("Type the command again but this time, put someone else in.")
                    .setTimestamp()
                    message.channel.send(error_embed)
        }
    }
};

function game_challenge_rps( message, client) {
    return new discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(message.author.username + ' challenged ' + client.users.cache.get(require('./game-status.js').games[message.author.id].player_two).username + ' to a game of Rock, Paper, Scissors!')
        .setThumbnail('https://www.netclipart.com/pp/m/290-2901471_rock-paper-scissors-clipart.png')
}  

function game_challenge_ttt(message, client) {
    return new discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(message.author.username + ' challenged ' + client.users.cache.get(require('./game-status.js').games[message.author.id].player_two).username + ' to a game of Tic, Tac, Toe!')
        .setThumbnail('https://images.squarespace-cdn.com/content/v1/54f74f23e4b0952b4e0011c0/1580269334204-W1N8ATYATHA6XP02YVSY/ke17ZwdGBToddI8pDm48kGtxPgPaOBG5VTwzK0O3JPx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmYfwwyaF2qdqpAEW-vwkS-q9yrvcVcBFNcMZ7RZJD-G-L7L3_iLqMJNwF1D5UY19g/tictac.png?format=1500w')
}