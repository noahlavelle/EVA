const {
    MessageEmbed
} = require('discord.js');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {
    geniusLyricsAPI
} = require('../../config.json');

module.exports = {
    name: 'lyrics',
    description: 'Gives the lyrics to a song or the song currently being played',
    usage: '<song-name>',
    cooldown: 15,
    guildOnly: true,
    execute(message, args, client) {
        async function run() {
            let songName = '';
            for (i in args) {
                songName += `${args[i]} `
            }
            if (
                songName == '' &&
                message.guild.musicData.isPlaying
            ) {
                songName = message.guild.musicData.nowPlaying.title;
            } else if (songName == '' && !message.guild.musicData.isPlaying) {
                return message.channel.send(
                    'There is no song playing right now, please try again with a song name or play a song first'
                );
            }
            const sentMessage = await message.channel.send(
                '👀 Searching for lyrics 👀'
            );
            songName = songName.replace(/ *\([^)]*\) */g, '');
            songName = songName.replace(
                /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                ''
            );
            var url = `https://api.genius.com/search?q=${encodeURI(songName)}`;

            const headers = {
                Authorization: `Bearer ${geniusLyricsAPI}`
            };
            try {
                var body = await fetch(url, {
                    headers
                });
                var result = await body.json();
                const songPath = result.response.hits[0].result.api_path;
                url = `https://api.genius.com${songPath}`;
                body = await fetch(url, {
                    headers
                });
                result = await body.json();

                const song = result.response.song;

                let lyrics = await getLyrics(song.url);
                lyrics = lyrics.replace(/(\[.+\])/g, '');
                if (!lyrics) {
                    return message.channel.send(
                        'No lyrics have been found for your query, please try again and be more specific.'
                    );
                }

                if (lyrics.length > 4095)
                    return message.channel.send(
                        'Lyrics are too long to be returned in a message embed'
                    );
                if (lyrics.length < 2048) {
                    const lyricsEmbed = new MessageEmbed()
                        .setColor('#3498db')
                        .setDescription(lyrics.trim());
                    return sentMessage.edit('', lyricsEmbed);
                } else {
                    const firstLyricsEmbed = new MessageEmbed()
                        .setColor('#3498db')
                        .setDescription(lyrics.slice(0, 2048));
                    const secondLyricsEmbed = new MessageEmbed()
                        .setColor('#3498db')
                        .setDescription(lyrics.slice(2048, lyrics.length));
                    sentMessage.edit('', firstLyricsEmbed);
                    message.channel.send(secondLyricsEmbed);
                    return;
                }
            } catch (e) {
                return sentMessage.edit(
                    'Something when wrong, please try again or be more specific'
                );
            }
            async function getLyrics(url) {
                const response = await fetch(url);
                const text = await response.text();
                const $ = cheerio.load(text);
                return $('.lyrics')
                    .text()
                    .trim();
            }
        }
        run();
    }
}