const config = require('../config');
const { cmd, commands } = require('../command');

// Register the 'menu' command
cmd({
    pattern: "menu",
    alias: ["allmenu", "help"],
    desc: "Get bot cmd menu",
    category: "main",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname, isMe,
    isOwner, groupMetadata, groupName, participants, groupAdmins,
    isBotAdmins, isAdmins, reply
}) => {
    try {

        let menu = {
            main: '',
            download: '',
            group:'',
            owner: '',
            convert: '',
            search: ''
        };

        for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && !commands[i].dontAddCommandList) {
        menu[commands[i].category] += `.${commands[i].pattern}\n`;
       }
    }

        let madeMenu = `👹️ *_Chuti_Yakshani-Md_* 👹️

👋 *Hello* ${pushname}

> *Main Commands* ⚙️

${menu.main}

> *Owner Commands* 🧑‍💻

${menu.owner}

> *Group Commands* 🥷

${menu.group}

> *Convert Commands* ♻️

${menu.convert}

> *Download Commands* ⏬

${menu.download}

> *Search Commands* 🌐

${menu.search}

♻️ *~Powered by Chuti_Yakshani-MD~* ♻️`

    await conn.sendMessage(from,{image:{url:"https://telegra.ph/file/3653d1cd025076c0559d5.jpg"},caption:madeMenu},{quoted:mek})

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
