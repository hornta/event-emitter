interface EventsMap {
  [event: string]: any;
}

interface DefaultEvents extends EventsMap {
  [event: string]: (...args: any) => void;
}

export class EventEmitter<Events extends EventsMap = DefaultEvents> {
  private eventListeners: Partial<{ [E in keyof Events]: Events[E][] }>;

  constructor() {
    this.eventListeners = {};
  }

  addListener<E extends keyof Events>(event: E, listener: Events[E]) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event]!.push(listener);
  }

  removeAllListeners<E extends keyof Events>(event?: E) {
    if (event) {
      delete this.eventListeners[event];
    } else {
      this.eventListeners = {};
    }
  }

  removeListener<E extends keyof Events>(event: E, listener: Events[E]) {
    const listeners = this.eventListeners[event];
    if (listeners?.includes(listener)) {
      listeners.splice(listeners.indexOf(listener), 1);
    }
  }

  emit<E extends keyof Events>(event: E, ...args: Parameters<Events[E]>) {
    const listeners = this.eventListeners[event];
    listeners?.forEach((listener) => {
      listener(...args);
    });
  }
}
