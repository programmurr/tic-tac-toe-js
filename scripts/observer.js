const Observers = () => {
	const observers = [];

	function addObserver(newObserver) {
		observers.push(newObserver);
	}

	function notifyObservers(cell) {
		observers.forEach(function(observer) {
			observer.update(observer, cell);
		});
	}

	return { observers, addObserver, notifyObservers };
};

const gameObserver = Observers();
