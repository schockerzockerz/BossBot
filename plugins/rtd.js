boss.on("cmd /rtd", (msg) => {
	boss.sendMessage({
		text: Math.ceil(Math.random() * 6),
		chat_id: msg.chat.id
	})
})