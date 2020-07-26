const discord = require('discord.js')

module.exports = {
	name: 'ttt',
    description: 'Interact with the game of Tic, Tac, Toe.',
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
                                    require('./game-status.js').set_player_two('accepted', true, message.author.id)
                                    game_status.set_player_two('game_stage', 1, message.author.id)
                                    ttt_embedd(client, message)
                                    game_status = require('./game-status')
                                    break;
                                case 'decline':
                                    const game_declined_embed = new discord.MessageEmbed()
                                    .setColor('#00ff00')
                                    .setTitle(message.author.username + ' has declined the Tic, Tac, Toe game: (' + client.users.cache.get(game_status.games[message.author.id].player_one).username + ' vs ' + client.users.cache.get(game_status.games[message.author.id].player_two).username + ')')
                                    .setTimestamp()
                                    .setThumbnail('https://images.squarespace-cdn.com/content/v1/54f74f23e4b0952b4e0011c0/1580269334204-W1N8ATYATHA6XP02YVSY/ke17ZwdGBToddI8pDm48kGtxPgPaOBG5VTwzK0O3JPx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmYfwwyaF2qdqpAEW-vwkS-q9yrvcVcBFNcMZ7RZJD-G-L7L3_iLqMJNwF1D5UY19g/tictac.png?format=1500w')
                                    client.users.cache.get(game_status.games[message.author.id].player_one).send(game_declined_embed)
                                    game_status.reset(require('./game-status.js').games[message.author.id].player_one, game_status.games[message.author.id].player_two)
                                    break;
                            }
                        break;  
                    }
                break;
            case 1:
                switch (message.author.id) {
                    case require('./game-status.js').games[message.author.id].player_one:
                            if (Number.isInteger(parseInt(args[0]))) {
                                if (args[0] <= 9 && args[0] >= 1) {
                                    const game_status = require('./game-status.js')
                                    if (game_status.games[message.author.id].ttt_grid[args[0] - 1] == ' ') {
                                        game_status.set_player_one('ttt_grid', 'X', message.author.id, args[0] - 1)    
                                        game_status.set_player_one('game_stage', 2, message.author.id)
                                        ttt_embedd(client, message)
                                    }
                                    else {
                                        error_embed_taken(message)
                                    }
                                }
                                else {
                                    error_embed_number(message)
                                }
                            }
                            else {
                                error_embed_number(message)
                            }
                        return;
                    case require('./game-status.js').games[message.author.id].player_two:
                            error_embed_player_one(message, client)
                        return;
                    }
            case 2:
                switch (message.author.id) {
                    case require('./game-status.js').games[message.author.id].player_two:
                            if (Number.isInteger(parseInt(args[0]))) {
                                if (args[0] <= 9 && args[0] >= 1) {
                                    const game_status = require('./game-status.js')
                                    if (game_status.games[message.author.id].ttt_grid[args[0] - 1] == ' ') {
                                        game_status.set_player_two('ttt_grid', 'O', message.author.id, args[0] - 1)
                                        game_status.set_player_two('game_stage', 3, message.author.id)
                                        ttt_embedd(client, message)
                                    }
                                    else {
                                        error_embed_taken(message)
                                    }
                                }
                                else {
                                    error_embed_number(message)
                                }
                            }
                            else {
                                error_embed_number(message)
                            }
                        return;;
                    case require('./game-status.js').games[message.author.id].player_one:
                            error_embed_player_two(message, client)
                        return;
                    }
            case 3:
                switch (message.author.id) {
                    case require('./game-status.js').games[message.author.id].player_one:
                            if (Number.isInteger(parseInt(args[0]))) {
                                if (args[0] <= 9 && args[0] >= 1) {
                                    const game_status = require('./game-status.js')
                                    if (game_status.games[message.author.id].ttt_grid[args[0] - 1] == ' ') {
                                        game_status.set_player_one('ttt_grid', 'X', message.author.id, args[0] - 1)
                                        game_status.set_player_one('game_stage', 4, message.author.id)
                                        ttt_embedd(client, message)
                                    }
                                    else {
                                        error_embed_taken(message)
                                    }
                                }
                                else {
                                    error_embed_number(message)
                                }
                            }
                            else {
                                error_embed_number(message)
                            }
                        return;
                    case require('./game-status.js').games[message.author.id].player_two:
                            error_embed_player_one(message, client)
                        return;
                    }
            case 4:
                switch (message.author.id) {
                    case require('./game-status.js').games[message.author.id].player_two:
                            if (Number.isInteger(parseInt(args[0]))) {
                                if (args[0] <= 9 && args[0] >= 1) {
                                    const game_status = require('./game-status.js')
                                    if (game_status.games[message.author.id].ttt_grid[args[0] - 1] == ' ') {
                                        game_status.set_player_two('ttt_grid', 'O', message.author.id, args[0] - 1)
                                        game_status.set_player_two('game_stage', 5, message.author.id)
                                        ttt_embedd(client, message)
                                    }
                                    else {
                                        error_embed_taken(message)
                                    }
                                }
                                else {
                                    error_embed_number(message)
                                }
                            }
                            else {
                                error_embed_number(message)
                            }
                        return;
                    case require('./game-status.js').games[message.author.id].player_one:
                            error_embed_player_two(message, client)
                        return;
                    }
            case 5:
                switch (message.author.id) {
                    case require('./game-status.js').games[message.author.id].player_one:
                            if (Number.isInteger(parseInt(args[0]))) {
                                if (args[0] <= 9 && args[0] >= 1) {
                                    const game_status = require('./game-status.js')
                                    if (game_status.games[message.author.id].ttt_grid[args[0] - 1] == ' ') {
                                        game_status.set_player_one('ttt_grid', 'X', message.author.id, args[0] - 1)
                                        game_status.set_player_one('game_stage', 6, message.author.id)
                                        ttt_embedd(client, message)
                                    }
                                    else {
                                        error_embed_taken(message)
                                    }
                                }
                                else {
                                    error_embed_number(message)
                                }
                            }
                            else {
                                error_embed_number(message)
                            }
                        return;
                    case require('./game-status.js').games[message.author.id].player_two:
                            error_embed_player_one(message, client)
                        return;
                    }
            case 6:
                switch (message.author.id) {
                    case require('./game-status.js').games[message.author.id].player_two:
                            if (Number.isInteger(parseInt(args[0]))) {
                                if (args[0] <= 9 && args[0] >= 1) {
                                    const game_status = require('./game-status.js')
                                    if (game_status.games[message.author.id].ttt_grid[args[0] - 1] == ' ') {
                                        game_status.set_player_two('ttt_grid', 'O', message.author.id, args[0] - 1)
                                        game_status.set_player_two('game_stage', 7, message.author.id)
                                        ttt_embedd(client, message)
                                    }
                                    else {
                                        error_embed_taken(message)
                                    }
                                }
                                else {
                                    error_embed_number(message)
                                }
                            }
                            else {
                                error_embed_number(message)
                            }
                        return;
                    case require('./game-status.js').games[message.author.id].player_one:
                            error_embed_player_two(message, client)
                        return;
                    }
            case 7:
                switch (message.author.id) {
                    case require('./game-status.js').games[message.author.id].player_one:
                            if (Number.isInteger(parseInt(args[0]))) {
                                if (args[0] <= 9 && args[0] >= 1) {
                                    const game_status = require('./game-status.js')
                                    if (game_status.games[message.author.id].ttt_grid[args[0] - 1] == ' ') {
                                        game_status.set_player_one('ttt_grid', 'X', message.author.id, args[0] - 1)
                                        game_status.set_player_one('game_stage', 8, message.author.id)
                                        ttt_embedd(client, message)
                                    }
                                    else {
                                        error_embed_taken(message)
                                    }
                                }
                                else {
                                    error_embed_number(message)
                                }
                            }
                            else {
                                error_embed_number(message)
                            }
                        return;
                    case require('./game-status.js').games[message.author.id].player_two:
                            error_embed_player_one(message, client)
                        return;
                    }
            case 8:
                switch (message.author.id) {
                    case require('./game-status.js').games[message.author.id].player_two:
                            if (Number.isInteger(parseInt(args[0]))) {
                                if (args[0] <= 9 && args[0] >= 1) {
                                    const game_status = require('./game-status.js')
                                    if (game_status.games[message.author.id].ttt_grid[args[0] - 1] == ' ') {
                                        game_status.set_player_two('ttt_grid', 'O', message.author.id, args[0] - 1)
                                        game_status.set_player_two('game_stage', 9, message.author.id)
                                        ttt_embedd(client, message)
                                    }
                                    else {
                                        error_embed_taken(message)
                                    }
                                }
                                else {
                                    error_embed_number(message)
                                }
                            }
                            else {
                                error_embed_number(message)
                            }
                        return;
                    case require('./game-status.js').games[message.author.id].player_one:
                            error_embed_player_two(message, client)
                        return;
                    }
            case 9:
                switch (message.author.id) {
                    case require('./game-status.js').games[message.author.id].player_one:
                            if (Number.isInteger(parseInt(args[0]))) {
                                if (args[0] <= 9 && args[0] >= 1) {
                                    const game_status = require('./game-status.js')
                                    if (game_status.games[message.author.id].ttt_grid[args[0] - 1] == ' ') {
                                        game_status.set_player_one('ttt_grid', 'X', message.author.id, args[0] - 1)
                                        game_status.set_player_one('game_stage', 10, message.author.id)
                                        ttt_embedd(client, message)
                                    }
                                    else {
                                        error_embed_taken(message)
                                    }
                                }
                                else {
                                    error_embed_number(message)
                                }
                            }
                            else {
                                error_embed_number(message)
                            }
                        return;
                    case require('./game-status.js').games[message.author.id].player_two:
                            error_embed_player_one(message, client)
                        return;
                    }
        }
    }
}

function error_embed_number(message) {
    const error_embed = new discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Please enter a number between 1 and 9')
    .setTimestamp()
    .setThumbnail('https://images.squarespace-cdn.com/content/v1/54f74f23e4b0952b4e0011c0/1580269334204-W1N8ATYATHA6XP02YVSY/ke17ZwdGBToddI8pDm48kGtxPgPaOBG5VTwzK0O3JPx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmYfwwyaF2qdqpAEW-vwkS-q9yrvcVcBFNcMZ7RZJD-G-L7L3_iLqMJNwF1D5UY19g/tictac.png?format=1500w')
    message.author.send(error_embed)
}

function error_embed_player_one(message, client) {
    const game_status = require('./game-status.js')
    const error_embed = new discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Please wait for your go')
    .setTimestamp()
    .setThumbnail('https://images.squarespace-cdn.com/content/v1/54f74f23e4b0952b4e0011c0/1580269334204-W1N8ATYATHA6XP02YVSY/ke17ZwdGBToddI8pDm48kGtxPgPaOBG5VTwzK0O3JPx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmYfwwyaF2qdqpAEW-vwkS-q9yrvcVcBFNcMZ7RZJD-G-L7L3_iLqMJNwF1D5UY19g/tictac.png?format=1500w')
    client.users.cache.get(game_status.games[message.author.id].player_two).send(error_embed)
}

function error_embed_player_two(message, client) {
    const game_status = require('./game-status.js')
    const error_embed = new discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Please wait for your go')
    .setTimestamp()
    .setThumbnail('https://images.squarespace-cdn.com/content/v1/54f74f23e4b0952b4e0011c0/1580269334204-W1N8ATYATHA6XP02YVSY/ke17ZwdGBToddI8pDm48kGtxPgPaOBG5VTwzK0O3JPx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmYfwwyaF2qdqpAEW-vwkS-q9yrvcVcBFNcMZ7RZJD-G-L7L3_iLqMJNwF1D5UY19g/tictac.png?format=1500w')
    client.users.cache.get(game_status.games[message.author.id].player_one).send(error_embed)
}

function error_embed_taken(message) {
    const error_embed = new discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle("Please enter a number that hasn't been taken yet")
    .setTimestamp()
    .setThumbnail('https://images.squarespace-cdn.com/content/v1/54f74f23e4b0952b4e0011c0/1580269334204-W1N8ATYATHA6XP02YVSY/ke17ZwdGBToddI8pDm48kGtxPgPaOBG5VTwzK0O3JPx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmYfwwyaF2qdqpAEW-vwkS-q9yrvcVcBFNcMZ7RZJD-G-L7L3_iLqMJNwF1D5UY19g/tictac.png?format=1500w')
    message.author.send(error_embed)
}

function ttt_grid(message) {
    const game_status = require('./game-status.js')
    const grid = game_status.games[message.author.id].ttt_grid
    return '`' + grid[0] + '` `' + grid[1] + '` `' + grid[2] + '` \n`' + grid[3] + '` `' + grid[4] + '` `' + grid[5] + '` \n`' + grid[6] + '` `' + grid[7] + '` `' + grid[8] + '`'
}

function players_go(message, client) {
    const game_status = require('./game-status.js')
    if (isOdd(game_status.games[message.author.id].game_stage) == 1) {
        return client.users.cache.get(game_status.games[message.author.id].player_one).username
    }
    else {
        return client.users.cache.get(game_status.games[message.author.id].player_two).username
    }
}

function ttt_embedd(client, message) {
    const prefix = require('../index').prefix
    const game_status = require('./game-status.js')
    const ttt_embed = new discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Tic, Tac, Toe game: (' + client.users.cache.get(game_status.games[message.author.id].player_one).username + ' vs ' + client.users.cache.get(game_status.games[message.author.id].player_two).username + ') has started.')
        .setDescription('Please enter ' + prefix + 'ttt 1 - 9, (1 = top left, 9 = bottom right\n' + ttt_grid(message) + "\nCurrent player's go: " + players_go(message, client))
        .setTimestamp()
        .setThumbnail('https://images.squarespace-cdn.com/content/v1/54f74f23e4b0952b4e0011c0/1580269334204-W1N8ATYATHA6XP02YVSY/ke17ZwdGBToddI8pDm48kGtxPgPaOBG5VTwzK0O3JPx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmYfwwyaF2qdqpAEW-vwkS-q9yrvcVcBFNcMZ7RZJD-G-L7L3_iLqMJNwF1D5UY19g/tictac.png?format=1500w')
        client.users.cache.get(game_status.games[message.author.id].player_one).send(ttt_embed)
        client.users.cache.get(game_status.games[message.author.id].player_two).send(ttt_embed)
}

function isOdd(number) {
    return number % 2;
}