import { DOMListener } from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subcribers = [];

    this.prepare();
  }

  prepare() {}

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.subcribers.forEach(sub => sub());
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const sub = this.emitter.subscribe(event, fn);
    this.subcribers.push(sub);
  }

  toHTML() {
    return '';
  }
}
