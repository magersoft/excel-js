import { ExcelStateComponents } from '@core/ExcelStateComponents';
import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/dom';
import { defaultStyles } from '@/constans';

export class Toolbar extends ExcelStateComponents {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }

  toHTML() {
    return this.template;
  }
}
