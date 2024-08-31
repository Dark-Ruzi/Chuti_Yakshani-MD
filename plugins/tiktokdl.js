const { cmd, commands } = require('../command');
const TikTokAPI = require('tiktok-api');

// Create a new instance of TikTokAPI
const tiktok = new TikTokAPI();

// Register the 'tiktok' command
cmd({
    pattern: "tiktok",
    desc: "Download TikTok videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("Please provide the TikTok video URL.");

        // Fetch TikTok video metadata
        const videoMeta = await tiktok.getVideoMeta(q);
        const videoUrl = videoMeta.videoUrl;
        const coverUrl = videoMeta.cover;
        const author = videoMeta.author;
        const music = videoMeta.music;
        const duration = videoMeta.duration;
        const views = videoMeta.views;
        const id = videoMeta.id;

        let desc = `
👹️ *_Chuti_Yakshani-Md TikTok Downloader_* 👹️

*Author :-* ${author}

*Music :-* ${music}

*Duration :-* ${duration}s

*Views :-* ${views}


♻️ *~Generated by Chuti_Yakshani-MD~* ♻️      
        `;

        // Send video details with thumbnail
        await conn.sendMessage(from, { image: { url: coverUrl }, caption: desc }, { quoted: mek });

        // Send the video file
        await conn.sendMessage(from, { video: { url: videoUrl }, mimetype: "video/mp4" }, { quoted: mek });
        
        // Send the video as a document file
        await conn.sendMessage(from, { document: { url: videoUrl }, mimetype: "video/mp4", fileName: `${id}.mp4`, caption: "♻️ *~Generated by Chuti_Yakshani-MD~* ♻️" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});
