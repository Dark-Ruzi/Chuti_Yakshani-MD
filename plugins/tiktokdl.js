const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

// Register the 'song' command
cmd({
    pattern: "song",
    desc: "Download songs",
    category: "download",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("Please provide the URL or the title.");

        // Search for the song on YouTube
        const search = await yts(q);
        const data = search.videos[0]; // Get the first search result
        const url = data.url;

        let desc = `
👹️ *_Chuti_Yakshani-Md Song Downloader_* 👹️

*Title :-* ${data.title}

*Description :-* ${data.description}

*Duration :-* ${data.timestamp}

*Uploaded :-* ${data.ago}

*Views :-* ${data.views}


♻️ *~Generated by Chuti_Yakshani-MD~* ♻️      
        `;

        // Send video details with thumbnail
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download the audio
        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        // Send the audio file
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        
        // Send the audio as a document file
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: data.title + ".mp3", caption: "♻️ *~Generated by Chuti_Yakshani-MD~* ♻️" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Register the 'video' command
cmd({
    pattern: "video",
    desc: "Download videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("Please provide the URL or the title.");

        // Search for the video on YouTube
        const search = await yts(q);
        const data = search.videos[0]; // Get the first search result
        const url = data.url;

        let desc = `
👹️ *_Chuti_Yakshani-Md Video Downloader_* 👹️

*Title :-* ${data.title}

*Description :-* ${data.description}

*Duration :-* ${data.timestamp}

*Uploaded :-* ${data.ago}

*Views :-* ${data.views}


♻️ *~Generated by Chuti_Yakshani-MD~* ♻️      
        `;

        // Send video details with thumbnail
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download the video
        let down = await fg.ytv(url);
        let downloadUrl = down.dl_url;

        // Send the video file
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        
        // Send the video as a document file
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: data.title + ".mp4", caption: "♻️ *~Generated by Chuti_Yakshani-MD~* ♻️" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
