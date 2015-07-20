boss.addCommand({
					command: 'katze',
					description: 'Zeigt Katzenbilder',
					callback: function(event){

						var http = require('http');

						var options = {
						  host: 'thecatapi.com',
						  path: '/api/images/get?format=src'
						};

						callback = function(response) {
						  	var url = response.headers.location;

						  	// Temp verzeichnis
						  	var path = "./tmp/";
						  	var fs = require('fs');

						  	if (!fs.existsSync(path)){
							    fs.mkdirSync(path);
							}

							var filename = path + Math.ceil(Math.random() * 100) + ".jpg";

							var file = fs.createWriteStream(filename);

						  	var httprequest = http.get(url, function(response) {
							  	response.pipe(file);

							  	file.close();

							  	// Request außerhalb der API

								var formData = {
									chat_id: event.message.chat.id,
									photo: {
										value:  fs.createReadStream(filename),
										options: {
											filename: 'katze.jpg',
											contentType: 'image/jpg'
										}
									}
								};

								var request = require('request');
								var apiurl = 'https://api.telegram.org/bot' + process.env.TELEGRAM_BOT_TOKEN + '/sendPhoto';

								request.post({url:apiurl, formData: formData}, function optionalCallback(err, httpResponse, body) {
									if (err) {
										return console.log(err);
									}

									console.log(apiurl, body);
								});


							});

						 
									
						
						

						  	
						 
						}

						http.request(options, callback).end();

						
					}
				});