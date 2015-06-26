var bosslines = [
	'Ich sagte „Koch mir Kaffee“, doch habs mir noch überlegt und will jetzt doch lieber Tee, wie’n französischer Freiheitskämpfer',
	'Ich battle nicht, ich zerstöre, wie Angler',
	'Ich relax und chill in fetten Villen mit mehr Personenaufzügen als ein Actionfilm',
	'Der King kauft sich Kleiderbügel und hängt sich Anzüge dran, wie U-Bahn-Surfer',
	'während ihr täglich resigniert, führe ich ein Übermenschen-Dasein wie ein Regenschirm',
	'Kollegah ist wie Adam: ein gemachter Mann',
	'doch sie war wie Winnie Puuh: Bei der Arbeit hatte die Hoe nich zu essen',
	'Denn er hat ne Menge Ansehen, wie Michigan',
	'und ist von Fans umgeben, wie’n englischer Vorgarten',
	'ich hab’ ‘ne Menge Anwesen, wie Fantasyromane',
	'Ich bange die Hure, schwänger die Hure, dann ist die Hure ne Mami wie ne englische Mumie',
	'Es ist wie Ventilatoren, wenn du Wind davon bekommst, wirst du kalt gemacht'
]

boss.on("message", (msg) => {
	match = (/(.*)[bB]oss(.+)line/.test(msg.text))
	
	if(match) {

		chosen = Math.floor(Math.random() * bosslines.length);

		boss.sendMessage({
			text: bosslines[chosen],
			chat_id: msg.chat.id
		});
		
	}
	
});

