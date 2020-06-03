import { DOMListener } from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;

    this.subscribers = [];

    this.prepare();
  }

  prepare() {}

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.subscribers.forEach(sub => sub());
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const sub = this.emitter.subscribe(event, fn);
    this.subscribers.push(sub);
  }

  toHTML() {
    return '';
  }
}
