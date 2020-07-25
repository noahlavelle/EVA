//file for exporting re-used functions 
const Discord = require('discord.js')

function embed(message, color) {
    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(message)
    return embed
}

function titleEmbed(message, color, title) {
    const titleEmbed = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(message)
        .setColor(color)
        .setTimestamp()
    return titleEmbed
}

module.exports.titleEmbed = titleEmbed;
module.exports.embed = embed;