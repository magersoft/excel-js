import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { changeTitle } from '@/store/actions';
import { defaultDelay, defaultTitle } from '@/config';
import { debounce } from '@core/utils';
import { ActiveRoute } from '@core/router/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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

  onClick(event) {
    const $target = $(event.target);
    console.log($target);
    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить таблицу?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;

    return `
      <input type="text" class="input" value="${title}" />
      <div>

        <div class="button">
          <i class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>

      </div>`;
  }
}
