boss.on("message", (msg) => {

	regex = /(.*)[bB]oss(.+)wetter(.*) in ([^ ]+)/;

	match = regex.test(msg.text);
	
	if(match) {

		ort = msg.text.match(regex);

		var weather = require('weather-js');

		weather.find({search: 'San Francisco, CA', degreeType: 'C'}, function(err, result) {
		  	boss.sendMessage({
				text: "In " + result[0].location.name + " werden es morgen " + result[0].forecast.high + "°C",
				chat_id: msg.chat.id
			});
		});
		
	}
	
});