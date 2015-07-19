boss.addCommand({
					command: 'test',
					description: 'Dies ist ein Test',
					callback: function(event){
						boss.sendMessage({
							text: 'Ein Testevent',
							chat_id: event.message.chat.id
						});
					}
				});