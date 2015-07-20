var Cleverbot = require("cleverbot-node");
var cleverbot = new Cleverbot;
cleverbot.prepare();
boss.on("message", (msg) => {
	if (msg.text.startsWith("/") || !msg.text.includes("boss") && !msg.text.includes("Boss")) {return;}
	
	msg.text = msg.text.replace(/\bBoss\b/ig, "Cleverbot");

	cleverbot.write(msg.text, (res) => {
		boss.sendMessage({
			text: res.message.replace(/\bCleverbot\b/ig, "Boss"),
			chat_id: msg.chat.id
		})
	})
})