const { cmd } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

let searchCache = {};

// Helper function to handle the user's choice and download
async function handleDownload(conn, from, mek, url, type, data) {
    try {
        let down, downloadUrl, fileName;

        if (type === 'audio') {
            down = await fg.yta(url);
            downloadUrl = down.dl_url;
            fileName = `${data.title}.mp3`;
        } else if (type === 'video') {
            down = await fg.ytv(url);
            downloadUrl = down.dl_url;
            fileName = `${data.title}.mp4`;
        } else if (type === 'document') {
            if (searchCache[from].type === 'audio') {
                down = await fg.yta(url);
                downloadUrl = down.dl_url;
                fileName = `${data.title}.mp3`;
            } else if (searchCache[from].type === 'video') {
                down = await fg.ytv(url);
                downloadUrl = down.dl_url;
                fileName = `${data.title}.mp4`;
            }
        }

        if (type === 'audio' || type === 'video') {
            await conn.sendMessage(from, { [type]: { url: downloadUrl }, mimetype: type === 'audio' ? "audio/mpeg" : "video/mp4" }, { quoted: mek });
        } else if (type === 'document') {
            await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: searchCache[from].type === 'audio' ? "audio/mpeg" : "video/mp4", fileName, caption: "♻️ *~Generated by Chuti_Yakshani-MD~* ♻️" }, { quoted: mek });
        }
    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: e.message }, { quoted: mek });
    }
}

// Register the 'song' command
cmd({
    pattern: "song",
    desc: "Download songs",
    category: "download",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, q, reply
}) => {
    try {
        if (!q) return reply("Please provide the URL or the title.");

        // Search for the song on YouTube
        const search = await yts(q);
        const data = search.videos[0]; // Get the first search result
        const url = data.url;

        // Cache search result
        searchCache[from] = { url, data, type: 'audio' };

        let desc = `
👹️ *_Chuti_Yakshani-Md Song Downloader_* 👹️

*Title :-* ${data.title}
*Description :-* ${data.description}
*Duration :-* ${data.timestamp}
*Uploaded :-* ${data.ago}
*Views :-* ${data.views}

Please reply with:

    *.01* to download as audio
    *.02* to download as document

♻️ *~Generated by Chuti_Yakshani-MD~* ♻️      
        `;

        // Send video details with thumbnail and ask for a choice
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

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
    from, quoted, body, q, reply
}) => {
    try {
        if (!q) return reply("Please provide the URL or the title.");

        // Search for the video on YouTube
        const search = await yts(q);
        const data = search.videos[0]; // Get the first search result
        const url = data.url;

        // Cache search result
        searchCache[from] = { url, data, type: 'video' };

        let desc = `
👹️ *_Chuti_Yakshani-Md Video Downloader_* 👹️

*Title :-* ${data.title}
*Description :-* ${data.description}
*Duration :-* ${data.timestamp}
*Uploaded :-* ${data.ago}
*Views :-* ${data.views}

Please reply with:

    *.01* to download as video
    *.02* to download as document

♻️ *~Generated by Chuti_Yakshani-MD~* ♻️      
        `;

        // Send video details with thumbnail and ask for a choice
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Register the '01' command for audio or video
cmd({
    pattern: "01",
    desc: "Download the last searched media as audio or video",
    category: "subdownload",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, reply
}) => {
    const cachedData = searchCache[from];
    if (cachedData) {
        const type = cachedData.type;
        await handleDownload(conn, from, mek, cachedData.url, type, cachedData.data);
    } else {
        reply("No recent media found. Please use the 'song' or 'video' command first.");
    }
});

// Register the '02' command for downloading as a document
cmd({
    pattern: "02",
    desc: "Download the last searched media as a document",
    category: "subdownload",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, reply
}) => {
    const cachedData = searchCache[from];
    if (cachedData) {
        await handleDownload(conn, from, mek, cachedData.url, 'document', cachedData.data);
    } else {
        reply("No recent media found. Please use the 'song' or 'video' command first.");
    }
});
