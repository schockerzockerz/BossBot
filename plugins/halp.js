boss.addCommand({
					command: 'halp',
					description: 'Hilfeübersicht',
					callback: function(event){
						var text = "Hier ist die geringe Auswahl an nutzloser Scheiße die ich kann: \n\n";

						var commands = boss.getCommands();

						for (var i in commands) {
						  command = commands[i];
						  text = text + "/" + command.command + " - " + command.description + "\n";
						}

						boss.sendMessage({
							text: text,
							chat_id: event.message.chat.id
						});
					}
				});