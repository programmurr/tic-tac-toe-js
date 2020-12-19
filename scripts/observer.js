const Observers = () => {
	const observers = [];

	function addObserver(newObserver) {
		observers.push(newObserver);
	}

	function deleteObserver(oldObserver) {
		const index = observers.indexOf(oldObserver);
		if (index > -1) {
			observers.splice(index, 1);
		}
		return observers;
	}

	function notifyObservers() {
		observers.forEach(function(observer) {
			observer.update(observer);
		});
	}

	return { observers, addObserver, deleteObserver, notifyObservers };
};

const gameObserver = Observers();
