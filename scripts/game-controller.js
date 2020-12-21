const gameController = (function() {
	let players = JSON.parse(localStorage.getItem('players') || '[]');

	let activePlayer;
	let nextPlayer;
	let player1;
	let player2;

	if (players.length === 0) {
		player1 = Player(prompt("Player1, 'X', please enter your name"), 'X');
		player2 = Player(prompt("Player2, 'O', please enter your name"), 'O');
		players.push(player1);
		players.push(player2);
		_updateLocalStorage();
		[ activePlayer, nextPlayer ] = [ player1, player2 ];
	} else {
		[ activePlayer, nextPlayer ] = [ players[0], players[1] ];
		[ player1, player2 ] = [ players[0], players[1] ];
	}

	function _updateLocalStorage() {
		window['localStorage'].setItem('players', JSON.stringify(players));
	}

	function _switchPlayer(self) {
		[ self.activePlayer, self.nextPlayer ] = [ self.nextPlayer, self.activePlayer ];
	}

	function update(self, _cell) {
		_switchPlayer(self);
	}

	return { activePlayer, nextPlayer, update, player1, player2 };
})();

gameObserver.addObserver(gameController);
