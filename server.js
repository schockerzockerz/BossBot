"use strict"
var fs	= require( "fs");
var path = require( "path" )
var Boss = require("./lib/boss.js");
var fileSave = require('file-save');

GLOBAL.boss = new Boss(process.env.TELEGRAM_BOT_TOKEN);

let plugins = fs.readdirSync("./plugins");

plugins.forEach( function(plugin) {
	if (path.extname( plugin ) != ".js")
		return;
	try {
		require("./plugins/" + plugin);
		console.log("Loaded " + plugin);
	} catch (e) {
		console.trace(e);
	}
});

var cmdDump = fileSave("cmddump.txt");
var cmds = boss.getCommands();
for (var cmd in cmds) {
	cmd = cmds[cmd];
	cmdDump.write(cmd.command + " - " + cmd.description + "\n");
}
cmdDump.end();

boss.start();