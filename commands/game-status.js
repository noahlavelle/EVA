module.exports = {
    'game_playing' : 'false',
    'player_one' : 'false',
    'player_two' : 'false',
    'reset' : function() {
        modules.exports.game_playing = 'false'
        modules.exports.player_one = 'false'
        modules.exports.player_two = 'false'
    },
    name: 'game-status'
}