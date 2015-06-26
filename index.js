"use strict"
var Boss = require("./lib/boss.js");
var boss = new Boss(process.env.TELEGRAM_BOT_TOKEN);

boss.on("cmd /start", (msg) => {
	boss.sendMessage({
		text: "Ich Bin Der Boss.",
		chat_id: msg.chat.id
	});
})
boss.start();