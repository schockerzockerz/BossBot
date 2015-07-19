boss.addCommand({
					command: 'wetter',
					description: 'Gibt das Wetter an beliebigem Ort',
					callback: function(event){
						var weather = require('weather-js');

						weather.find({search: event.vars[0], degreeType: 'C'}, function(err, result) {
						  	boss.sendMessage({
								text: "In " + result[0].location.name + " werden es morgen " + result[0].forecast.high + "°C",
								chat_id: event.message.chat.id
							});
						});

					}
				});

