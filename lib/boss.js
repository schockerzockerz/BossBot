"use strict"
var Telegram = require("telegram-bot")

class Boss extends Telegram {
	constructor(token) {
		super(token);

		this.on("message", function(msg) {
			if (!msg.text) {return;}
			if (msg.text.startsWith("/")) {
				this.cmdHandler(msg);
			}
		});
	}

	cmdHandler(msg) {
		this.emit("cmd", msg)

		var cmd = msg.text.substr(msg.text.indexOf(" ")+1);
		this.emit("cmd " + cmd, msg);
	}
}

module.exports = Boss;