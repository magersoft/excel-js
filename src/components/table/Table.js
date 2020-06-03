import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import {
  isCell,
  shouldResize,
  matrix,
  nextSelector
} from '@/components/table/table.helpers';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom';
import * as actions from '@/store/actions';
import { defaultStyles, defaultTableSize } from '@/config';
import { parse } from '@core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  static rowCounts = defaultTableSize;

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', value => {
      this.selection.current.attr('data-value', value);
      this.selection.current.text(parse(value));
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyle(style);
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.selection.selectedIds
      }));
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);

    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.error('[Resize error]', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));

        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ];

    const { key, shiftKey } = event;

    if (keys.includes(key)) {
      if (key !== 'Enter') {
        event.preventDefault();
      }
      const id = this.selection.current.id(true);
      const $next = this.$root
          .find(nextSelector(key, shiftKey, id, event, Table.rowCounts));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }

  toHTML() {
    return createTable(Table.rowCounts, this.store.getState());
  }
}
