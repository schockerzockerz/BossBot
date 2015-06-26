boss.on("cmd /start", (msg) => {
	boss.sendMessage({
		text: "Ich Bin Der Boss.",
		chat_id: msg.chat.id
	});
});