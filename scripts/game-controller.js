const gameController = (function(player1, player2) {
	let activePlayer = player1;
	let nextPlayer = player2;
	let players = JSON.parse(localStorage.getItem('players') || '[]');
	players = players.splice(0, 2);

	// need to set players 1 and 2 to the players in the local storage object

	if (players.length === 0) {
		player1.playerName = prompt('Player1 (X), please enter your name');
		player2.playerName = prompt('Player2 (O), please enter your name');
	}

	players.push(player1);
	players.push(player2);

	_updateLocalStorage();

	function _updateLocalStorage() {
		window['localStorage'].setItem('players', JSON.stringify(players));
	}

	function switchPlayer(self) {
		[ self.activePlayer, self.nextPlayer ] = [ self.nextPlayer, self.activePlayer ];
	}

	function update(self, _cell) {
		switchPlayer(self);
	}

	return { activePlayer, nextPlayer, update, players };
})(player1, player2);

gameObserver.addObserver(gameController);
