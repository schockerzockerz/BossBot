boss.addCommand({
					command: 'wetter',
					description: 'Gibt das Wetter an beliebigem Ort',
					callback: function(event){

						// Emojimaker
						function getEmoji(weather) {
							var icons = {
								'clear-day': String.fromCodePoint(0x2600),
								'clear-night': String.fromCodePoint(0x1F319),
								'rain': String.fromCodePoint(0x2614),
								'snow': String.fromCodePoint(0x2744),
								'sleet': String.fromCodePoint(0x2744) + String.fromCodePoint(0x2614),
								'wind': String.fromCodePoint(0x1F4A8),
								'fog': String.fromCodePoint(0x2600),
								'cloudy': String.fromCodePoint(0x2601),
								'partly-cloudy-day': String.fromCodePoint(0x2600) + String.fromCodePoint(0x2601),
								'party-cloudy-night' : String.fromCodePoint(0x1F319) + String.fromCodePoint(0x2601)
							}	

							if(icons.hasOwnProperty(weather)){
								return icons[weather];
							}else{
								return '';
							}
						}
						
						
						var geocoder = require('node-geocoder')('google', 'http');

						var searchstring = event.vars.join(' ');
						searchstring = searchstring.toLowerCase();

						geocoder.geocode(searchstring, function(err, geolocation) {
							if(err || !geolocation[0] || searchstring == 'bielefeld'){
						  		boss.sendMessage({
									text: 'Kenn ich nich',
									chat_id: event.message.chat.id
								});
						  		return false;
						  	}

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
							  	
							  	if(err){
							  		boss.sendMessage({
										text: 'Kenn ich nich',
										chat_id: event.message.chat.id
									});
							  		return false;
							  	}


							  	tommorrow = weather.daily.data[2];



								var text = 		"Das Wetter in " + geolocation[0].formattedAddress + " " + String.fromCodePoint(0x1F481) + "\n";
								text = text + 	"Aktuell: " + weather.currently.temperature + "°C " + getEmoji(weather.currently.icon) + "\n";
								text = text + 	"Morgen: " + tommorrow.temperatureMin + " - " + tommorrow.temperatureMax + "°C " +  getEmoji(tommorrow.icon) + "\n";

							  	boss.sendMessage({
									text: text,
									chat_id: event.message.chat.id
								});
							});    
						});


					}
				});

