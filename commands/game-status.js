module.exports = {
    'add' : function(player_one, player_two, game) {
        module.exports.games[player_one] = {
            game_stage : 0,
            game_playing : game,
            player_one : player_one,
            player_two : player_two
        }
        module.exports.games[player_two] = {
            game_stage : 0,
            game_playing : game,
            player_one : player_one,
            player_two : player_two
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
        }
    },
    'set_player_two' : function(variable, content, player_two) {
        switch (variable) {
            case 'game_stage':
                module.exports.games[player_two].game_stage = content
                module.exports.games[module.exports.games[player_two].player_two].game_stage = content
                break;
            case 'game_playing':
                module.exports.games[player_two].game_playing = content
                module.exports.games[module.exports.games[player_two].player_two].game_playing = content
                break;
            case 'player_one':
                module.exports.games[player_two].player_one = content
                module.exports.games[module.exports.games[player_two].player_two].player_one = content
                break;
            case 'player_two':
                module.exports.games[player_two].player_two = content
                module.exports.games[module.exports.games[player_two].player_two].player_two = content
                break;
        }
    },
    'reset' : function (player_one, player_two) {
        module.exports.games = [1];
        module.exports.games[player_one] = {
            game_stage : undefined,
            game_playing : undefined,
            player_one : undefined,
            player_two : undefined
        }
        module.exports.games[player_two] = {
            game_stage : undefined,
            game_playing : undefined,
            player_one : undefined,
            player_two : undefined
        }
    }
}