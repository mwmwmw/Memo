let listeners = {};

export default class Memo {
	static on(event, handler, eventListeners = listeners) {
		if (eventListeners[event] === undefined) {
			eventListeners[event] = [handler];
		} else {
			eventListeners[event].push(handler);
		}
	}

	static off(event, handler, eventListeners = listeners) {
		if (eventListeners[event]) {
			for (let i = eventListeners[event].length - 1; i >= 0; i--) {
				if (eventListeners[event].length === 1) {
					delete eventListeners[event];
				} else {
					eventListeners[event].splice(i, 1);
					break;
				}
			}
		}
	}

	static trigger(event) {
		var data = new Array(...arguments);
		data.splice(0, 1);
		Memo.send(event, listeners, data)
	}

	static send(event, eventListeners = listeners, data) {
		if (eventListeners[event]) {
			for (let i = eventListeners[event].length - 1; i >= 0; i--) {
				if (eventListeners[event] !== undefined) {
					if (typeof eventListeners[event][i] === "function" && eventListeners[event][i]) {
						eventListeners[event][i](...data);
					} else {
						throw "Event handler is not a function.";
					}
				}
			}
		}
	}

	static unbindAll(eventListeners = listeners) {
		for (const event in eventListeners) {
			delete eventListeners[event];
		}
		return true;
	};

	constructor() {
		this.listeners = {};
	}

	on(event, handler) {
		Memo.on(event, handler, this.listeners);
	}

	off(event, handler) {
		Memo.off(event, handler, this.listeners);
	}

	trigger(event) {
		var data = new Array(...arguments);
		data.splice(0, 1);
		Memo.send(event, this.listeners, data);
	}

	unbindAll() {
		Memo.unbindAll(this.listeners);
	};
}
