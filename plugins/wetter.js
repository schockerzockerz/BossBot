boss.addCommand({
					command: 'wetter',
					description: 'Gibt das Wetter an beliebigem Ort',
					callback: function(event){
						var geocoder = require('node-geocoder')('google', 'http');

						geocoder.geocode(event.vars[0], function(err, geolocation) {
							var Forecast = require('forecast');

							var forecast = new Forecast({
							  service: 'forecast.io',
							  key: '550c3d389fd37e05b1a56f1b47d29ab7',
							  units: 'celcius', // Only the first letter is parsed 
							  cache: true,      // Cache API requests? 
							  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
							    minutes: 30
							    }
							});


							forecast.get([geolocation[0].latitude, geolocation[0].longitude], function(err, weather) {
							  	if(err) return console.dir(err);

							  	boss.sendMessage({
									text: "In " + geolocation[0].formattedAddress + " sind es aktuell " + weather.currently.temperature + "°C",
									chat_id: event.message.chat.id
								});
							});    
						});

						


						/*weather({location: 'Melbourne'}, function(data) {
							console.log(data.temp)
							boss.sendMessage({
								text: "In " + event.vars[0] + " sind es aktuell " + data.temp + "°C",
								chat_id: event.message.chat.id
							});
						});*/

					}
				});

