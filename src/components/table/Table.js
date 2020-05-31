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

export class Table extends ExcelComponent {
  static className = 'excel__table';
  static rowCounts = 20;

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown']
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));

        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
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
      this.selection.select($next);
    }
  }

  toHTML() {
    return createTable(Table.rowCounts);
  }
}
