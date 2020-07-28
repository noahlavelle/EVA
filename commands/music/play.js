const { MessageEmbed } = require('discord.js');
const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { youtubeAPI } = require('../../config.json');
const { parse } = require('path');
const youtube = new Youtube(youtubeAPI);

module.exports = {
	name: 'play',
	description: 'Plays a song or playlist.',
	cooldown: 2,
	guildOnly: true,
	args: true,
	usage: '<song or playlist url / song name>',
	execute(message, args, client) {
		async function run() {
            let query = '';
			const voiceChannel = message.member.voice.channel;

            if (!voiceChannel) return message.reply('You need to be in a voice channel to do that');

            for (i in args) {
                query += `${args[i]} `
            }
            
            if ( // Playlist
                query.match(
                    /^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/
                )
            ) {
                try {
                    const playlist = await youtube.getPlaylist(query);
                    const videosObj = await playlist.getVideos();

                    for (i in videosObj) {
                        const video = await videosObj[i].fetch();

                        const url = `https://www.youtube.com/watch?v=${video.raw.id}`;
                        const title = video.raw.snippet.title;
                        let duration = formatDuration(video.duration);
                        const thumbnail = video.thumbnails.high.url;
                        if (duration == '00:00') duration = 'Live Stream';
                        const song = {
                            url,
                            title,
                            duration,
                            thumbnail,
                            voiceChannel
                        };

                        message.guild.musicData.queue.push(song);
                    }
                    if (message.guild.musicData.isPlaying == false) {
                        message.guild.musicData.isPlaying = true;
                        return playSong(message.guild.musicData.queue, message);
                    } else if (message.guild.musicData.isPlaying == true) {
                        return message.reply(
                            `Playlist - :musical_note:  ${playlist.title} :musical_note: has been added to queue`
                        );
                    }
                } catch (err) {
                    console.error(err);
                    return message.reply('Playlist is either private or it does not exist');
                }
            }

            if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) { // Youtube Video
                const url = query;
                try {
                    query = query
                        .replace(/(>|<)/gi, '')
                        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                    const id = query[2].split(/[^0-9a-z_\-]/i)[0];
                    const video = await youtube.getVideoByID(id);
                    const title = video.title;
                    let duration = formatDuration(video.duration);
                    const thumbnail = video.thumbnails.high.url;
                    if (duration == '00:00') duration = 'Live Stream';
                    const song = {
                        url,
                        title,
                        duration,
                        thumbnail,
                        voiceChannel
                    };
                    message.guild.musicData.queue.push(song);
                    if (
                        message.guild.musicData.isPlaying == false ||
                        typeof message.guild.musicData.isPlaying == 'undefined'
                    ) {
                        message.guild.musicData.isPlaying = true;
                        return playSong(message.guild.musicData.queue, message)
                    } else if (message.guild.musicData.isPlaying == true) {
                        return message.reply(`${song.title} added to queue`)
                    }
                } catch (err) {
                    console.error(err);
                    return message.reply('Something went wrong, please try again later');
                }
            }
            try {
                const videos = await youtube.searchVideos(query, 5);
                if (videos.length < 5) {
                    return message.reply(
                        `I had some trouble finding what you were looking for, please try again or be more specific`
                    );
                }
                const vidNameArr = [];

                for (i in videos) {
                    vidNameArr.push(`${i + 1}: ${videos[i].title}`)
                }
                vidNameArr.push('exit')

                const embed = new MessageEmbed()
                    .setColor('#3498db')
                    .setTitle('Choose a song by commenting a number between 1 and 5')
                    .addFields(
                        { name: 'Song 1', value: vidNameArr[0]},
                        { name: 'Song 2', value: vidNameArr[1]},
                        { name: 'Song 3', value: vidNameArr[2]},
                        { name: 'Song 4', value: vidNameArr[3]},
                        { name: 'Song 5', value: vidNameArr[4]},
                        { name: 'Exit', value: 'exit'}
                    )
                    var songEmbed = await message.reply({embed});
                    try {
                        var response = await message.channel.awaitMessages(
                            msg => (msg.content > 0 && msg.content < 6) || msg.content === 'exit',
                            {
                                max: 1,
                                maxProcessed: 1,
                                time: 30000,
                                errors: ['time']
                            }
                        );

                        var videoIndex = parse(response.first().content);
                    } catch (err) {
                        console.error(err);
                        songEmbed.delete();
                        return message.reply(
                            'Please try again and enter a number between 1 and 5 or exit'
                        );
                    }

                    if (response.first().content === 'exit') return songEmbed.delete();
                    try {
                        var video = await youtube.getVideoByID(videos[videoIndex.base - 1].id);
                    } catch (err) {
                        console.error(err);
                        songEmbed.delete();
                        return message.reply(
                            'An error has occured when trying to get the video ID from youtube'
                        );
                    }
                    const url = `https://www.youtube.com/watch?v=${video.raw.id}`;
                    const title = video.title;
                    let duration = formatDuration(video.duration);
                    const thumbnail = video.thumbnails.high.url;
                    if (duration == '00:00') duration = 'Live Stream';
                    const song = {
                        url,
                        title,
                        duration,
                        thumbnail,
                        voiceChannel
                    };

                    message.guild.musicData.queue.push(song);

                    if (message.guild.musicData.isPlaying == false) {
                        message.guild.musicData.isPlaying = true;
                        songEmbed.delete();
                        playSong(message.guild.musicData.queue, message);
                    } else if (message.guild.musicData.isPlaying == true) {
                        songEmbed.delete();
                        return message.reply(`${song.title} added to queue`)
                    }
            } catch (err) {
                console.error(err);
                if (songEmbed) {
                    songEmbed.delete();
                }
                return message.reply(
                    'Something went wrong with searching the video you requested :('
                );
            }
            function playSong(queue, message) {
                let voiceChannel;
                queue[0].voiceChannel
                    .join()
                    .then(connection => {
                        const dispatcher = connection
                            .play(
                                ytdl(queue[0].url, {
                                    quality: 'highestaudio',
                                    highWaterMark: 1024 * 1024 * 10
                                })
                            )
                            .on ('start', () => {
                                message.guild.musicData.songDispatcher = dispatcher;
                                message.guild.musicData.nowPlaying = queue[0];
                                dispatcher.setVolume(message.guild.musicData.volume);
                                voiceChannel = queue[0].voiceChannel;

                                const videoEmbed = new MessageEmbed()
                                    .setThumbnail(queue[0].thumbnail)
                                    .setColor('#3498db')
                                    .addFields(
                                        { name: 'Now Playing:', value: queue[0].title },
                                        { name: 'Duration:', value: queue[0].duration }
                                    )
                                    
                                    if (queue[1]) videoEmbed.addField('Next Song:', queue[1].title);
                                    message.reply(videoEmbed);
                                    return queue.shift();
                            })
                            .on('finish', () => {
                                if (queue.length >= 1) {
                                    return playSong(queue, message);
                                } else {
                                    message.guild.musicData.isPlaying = false;
                                    return voiceChannel.leave();
                                }
                            })
                            .on('error', e => {
                                message.say('Cannot play song');
                                message.guild.musicData.queue.length = 0;
                                message.guild.musicData.isPlaying = false;
                                message.guild.musicData.nowPlaying = null;
                                console.error(e);
                                return voiceChannel.leave();
                            })
                    })
                    .catch(e => {
                        console.error(e);
                        return voiceChannel.leave();
                    })
            }

            function formatDuration(durationObj) {
                const duration = `${durationObj.hours ? durationObj.hours + ':' : ''}${
                    durationObj.minutes ? durationObj.minutes : '00'
                  }:${
                    durationObj.seconds < 10
                      ? '0' + durationObj.seconds
                      : durationObj.seconds
                      ? durationObj.seconds
                      : '00'
                  }`;
                  return duration;
            }
        }
        run();
    }
}