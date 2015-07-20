var bossVote = {
	active: false,
	question: '',
	options: [],
	votes: []
}

boss.addCommand({
					command: 'startvote',
					description: 'Startet ein Voting',
					callback: function(event){
						var question = event.vars.join(' ');

						bossVote.active = true;
						bossVote.question = question;
						bossVote.options = [];
						bossVote.votes = [];
						
						boss.sendMessage({
							text: 'Voting gestartet, Optionen hinzufügen mit /votingoption {option1} {option2} etc.',
							chat_id: event.message.chat.id
						});

					}
				});

boss.addCommand({
					command: 'votingoption',
					description: 'Eine Votingoption hinzufügen',
					callback: function(event){

						for (var option in event.vars) {
						  bossVote.options.push(event.vars[option]);
						  bossVote.votes.push(0);
						}

						
						boss.fireCommand('showvoting', [], event.message);

					}
				});


boss.addCommand({
					command: 'showvoting',
					description: 'Voting anzeigen',
					callback: function(event){

						var text = String.fromCodePoint(0x26A0) + " OBACHT, VOTING! " + String.fromCodePoint(0x26A0) + "\n\n" + bossVote.question + "\n\n";

						var totalvotes = 0;

						for (var vote in bossVote.votes) {
						  totalvotes += bossVote.votes[vote];
						}

						for (var i in bossVote.options) { 
						  text = text + " " + i + ". " + bossVote.options[i] + " - " + bossVote.votes[i] + " Stimmen\n";
						}

						text = text + "\n Abstimmen mit /vote und der Nummer";
						
						boss.sendMessage({
							text: text,
							chat_id: event.message.chat.id
						});

					}
				});


boss.addCommand({
					command: 'vote',
					description: 'Abstimmen',
					callback: function(event){

						if(typeof bossVote.votes[parseInt(event.vars[0])] != 'undefined'){
							bossVote.votes[parseInt(event.vars[0])]++;
						}
						
						boss.fireCommand('showvoting', [], event.message);

					}
				});