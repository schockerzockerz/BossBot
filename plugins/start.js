boss.on("cmd /start", (msg) => {
	console.log(boss)
	boss.sendMessage({
		text: "Ich Bin Der Boss.",
		chat_id: msg.chat.id
	});
});