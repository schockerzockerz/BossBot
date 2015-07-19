"use strict"
var Telegram = require("telegram-bot")

class Boss extends Telegram {
	constructor(token) {
		super(token);

		this.on("message", (msg) => {
			if (!msg.text) {return;}
			if (msg.text.startsWith("/")) {
				this.cmdHandler(msg);
			}
		});
	}

	cmdHandler(msg) {
		// Ist das Kunst oder kann das weg?? Hab mal auskommentiert
		//this.emit("cmd", msg)

		var strpos 	= msg.text.indexOf(" ")+1;
		var vars 	= [];
		var command = '';

		if(strpos != 0){
			vars 	= msg.text.substr(strpos).split(" ");
			command = msg.text.substr(0, strpos).replace("/", "");
		}else{
			command = msg.text.replace("/", "");
		}

		//var cmd = msg.text.substr(strpos);
		//this.emit("cmd " + cmd, msg);

		this.fireCommand(command, vars, msg);

	}

	/**
	 * Fügt ein Kommando zum Bossbot hinzu. Erwartet ein Objekt mit folgenden Attributen
	 * @param 	string 		command 	Kommando auf das reagiert werden soll. Bei Reaktion auf "/test" also "test"
	 * @param	string		description	Beschreibung des Kommando. Erscheint bei Eingabe von /halp
	 * @param 	function	callback	Callback für dieses Kommando. Erhält als param ein Objekt mit den Attributen "vars", "message"
	 *									"/test blumen 2" => {vars: ['blumen', '2'], message: #standard telegram message object#}
	 */

	addCommand(obj) {
		if(!Boss.commandCollection[obj.command]){
			Boss.commandCollection[obj.command] = obj;
		}
	}

	/**
	 * Feuert ein Command
	 * @param	string		command 	Kommando welches gefeurt wird
	 * @param 	array(str)	vars 		Variablen
	 * @param	object 		message 	Telegram-Message-Objekt
	 */

	fireCommand(command, vars, message) {
		if(Boss.commandCollection[command]){
			Boss.commandCollection[command].callback({
														vars: vars,
														message: message
													});
		}
	}

	/**
	 * Gibt einfach alle Commando-Objekte zurück für die Hilfe-Liste
	 */

	getCommands() {
		return Boss.commandCollection;
	}

	
}

// How do i static?
Boss.commandCollection = [];

module.exports = Boss;