import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { changeTitle } from '@/store/actions';
import { defaultDelay, defaultTitle } from '@/config';
import { debounce } from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, defaultDelay);
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;

    return `
      <input type="text" class="input" value="${title}" />
      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>`;
  }
}
