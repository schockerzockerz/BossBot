boss.addCommand({
					command: 'rtd',
					description: 'Schmeiß einen Würfel',
					callback: function(event){
						
						boss.sendMessage({
							text: Math.ceil(Math.random() * 6),
							chat_id: event.message.chat.id
						});

					}
				});

