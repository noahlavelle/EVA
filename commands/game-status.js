module.exports = {
    'add' : function(player_one, player_two, game) {
        module.exports.games[player_one] = {
            game_stage : 0,
            game_playing : game,
            player_one : player_one,
            player_two : player_two,
            player_one_inputed : false,
            player_two_inputed : false,
            player_one_input_code : false,
            player_two_input_code : false,
            accepted : false,
            playing_game : true,
            ttt_grid : ['—', '—', '—', '—', '—', '—', '—', '—', '—']
        }
        module.exports.games[player_two] = {
            game_stage : 0,
            game_playing : game,
            player_one : player_one,
            player_two : player_two,
            player_one_inputed : false,
            player_two_inputed : false,
            player_one_input_code : false,
            player_two_input_code : false,
            accepted : false,
            playing_game : true,
            ttt_grid : ['—', '—', '—', '—', '—', '—', '—', '—', '—']
        },
        module.exports.players.push(player_one),
        module.exports.players.push(player_two)
    },
    'set_player_one' : function(variable, content, player_one, ttt) {
        switch (variable) {
            case 'game_stage':
                module.exports.games[player_one].game_stage = content
                module.exports.games[module.exports.games[player_one].player_two].game_stage = content
                break;
            case 'game_playing':
                module.exports.games[player_one].game_playing = content
                module.exports.games[module.exports.games[player_one].player_two].game_playing = content
                break;
            case 'player_one':
                module.exports.games[player_one].player_one = content
                module.exports.games[module.exports.games[player_one].player_two].player_one = content
                break;
            case 'player_two':
                module.exports.games[player_one].player_two = content
                module.exports.games[module.exports.games[player_one].player_two].player_two = content
                break;
            case 'player_one_inputed':
                module.exports.games[player_one].player_one_inputed = content
                module.exports.games[module.exports.games[player_one].player_two].player_one_inputed = content
                break;
            case 'player_two_inputed':
                module.exports.games[player_one].player_two_inputed = content
                module.exports.games[module.exports.games[player_one].player_two].player_two_inputed = content
                break;
            case 'player_one_input_code':
                module.exports.games[player_one].player_one_input_code = content
                module.exports.games[module.exports.games[player_one].player_two].player_one_input_code = content
                break;
            case 'player_two_input_code':
                module.exports.games[player_one].player_two_input_code = content
                module.exports.games[module.exports.games[player_one].player_two].player_two_input_code = content
                break;
            case 'accepted':
                module.exports.games[player_one].accepted = content
                module.exports.games[module.exports.games[player_one].player_two].accepted = content
                break;
            case 'ttt_grid':
                module.exports.games[player_one].ttt_grid[ttt] = content
                module.exports.games[module.exports.games[player_one].player_two].ttt_grid[ttt] = content
                break;
        }
    },
    'set_player_two' : function(variable, content, player_two, ttt) {
        switch (variable) {
            case 'game_stage':
                module.exports.games[player_two].game_stage = content
                module.exports.games[module.exports.games[player_two].player_one].game_stage = content
                break;
            case 'game_playing':
                module.exports.games[player_two].game_playing = content
                module.exports.games[module.exports.games[player_two].player_one].game_playing = content
                break;
            case 'player_one':
                module.exports.games[player_two].player_one = content
                module.exports.games[module.exports.games[player_two].player_one].player_one = content
                break;
            case 'player_two':
                module.exports.games[player_two].player_two = content
                module.exports.games[module.exports.games[player_two].player_one].player_two = content
                break;
            case 'player_one_inputed':
                module.exports.games[player_two].player_one_inputed = content
                module.exports.games[module.exports.games[player_two].player_one].player_one_inputed = content
                break;
            case 'player_two_inputed':
                module.exports.games[player_two].player_two_inputed = content
                module.exports.games[module.exports.games[player_two].player_one].player_two_inputed = content
                break;
            case 'player_one_input_code':
                module.exports.games[player_two].player_one_input_code = content
                module.exports.games[module.exports.games[player_two].player_one].player_one_input_code = content
                break;
            case 'player_two_input_code':
                module.exports.games[player_two].player_two_input_code = content
                module.exports.games[module.exports.games[player_two].player_one].player_two_input_code = content
                break;
            case 'accepted':
                module.exports.games[player_two].accepted = content
                module.exports.games[module.exports.games[player_two].player_one].accepted = content
                break;
            case 'ttt_grid':
                module.exports.games[player_two].ttt_grid[ttt] = content
                module.exports.games[module.exports.games[player_two].player_one].ttt_grid[ttt] = content
                break;
        }
    },
    'reset' : function (player_one, player_two) {
        module.exports.games[player_one] = undefined,
        module.exports.games[player_one] = {
            accepted : true,
            playing_game : false
        }
        module.exports.games[player_two] = undefined,
        module.exports.games[player_two] = {
            accepted : true,
            playing_game : false
        }
        module.exports.players[module.exports.players.indexOf(player_one)] = false,
        module.exports.players[module.exports.players.indexOf(player_two)] = false
    }
}

module.exports.games = [1]
module.exports.players = [1]