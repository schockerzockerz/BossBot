"use strict"
var fs	= require( "fs");
var path		= require( "path" )
var Boss = require("./lib/boss.js");

GLOBAL.boss = new Boss(process.env.TELEGRAM_BOT_TOKEN);

let plugins = fs.readdirSync( "./plugins" );

plugins.forEach( function( plugin ) {
	if ( path.extname( plugin ) != ".js" )
		return;
	try {
		require( "./plugins/" + plugin );
		console.log( "Loaded " + plugin );
	} catch ( e ) {
		console.trace( e );
	}
});

boss.start();