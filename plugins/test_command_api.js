boss.addCommand({
					command: 'test',
					description: 'Dies ist ein Test',
					callback: function(event){
						boss.sendMessage({
							text: String.fromCodePoint(0x1F604),
							chat_id: event.message.chat.id
						});
					}
				});