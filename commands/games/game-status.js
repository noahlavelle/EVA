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
            player_two_input_code : false
        }
        module.exports.games[player_two] = {
            game_stage : 0,
            game_playing : game,
            player_one : player_one,
            player_two : player_two,
            player_one_inputed : false,
            player_two_inputed : false,
            player_one_input_code : false,
            player_two_input_code : false
        }
    },
    'set_player_one' : function(variable, content, player_one) {
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
        }
    },
    'set_player_two' : function(variable, content, player_two) {
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
        }
    },
    'reset' : function (player_one, player_two) {
        module.exports.games[player_one] = {
            game_stage : undefined,
            game_playing : false,
            player_one : undefined,
            player_two : undefined,
            player_one_inputed : undefined,
            player_two_inputed : undefined,
            player_one_input_code : undefined,
            player_two_input_code : undefined
        }
        module.exports.games[player_two] = {
            game_stage : undefined,
            game_playing : false,
            player_one : undefined,
            player_two : undefined,
            player_one_inputed : undefined,
            player_two_inputed : undefined,
            player_one_input_code : undefined,
            player_two_input_code : undefined
        }
    }
}

module.exports.games = [1]