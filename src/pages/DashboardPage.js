import { Page } from '@core/page/Page';
import { $ } from '@core/dom';
import { storage } from '@core/utils';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();

    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel on Pure JavaScript</h1>
      </div>
  
      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${now}" class="db__create">
            Новая <br /> Таблица
          </a>
        </div>
      </div>
  
      <div class="db__table db__view">
        ${ this.createRecordsTable() }
      </div>
    `);
  }

  getAllKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (!key.includes('excel')) {
        continue;
      }
      keys.push(key);
    }

    return keys;
  }


  createRecordsTable() {
    const keys = this.getAllKeys();

    if (!keys.length) {
      return `<p>Создайте вашу первую таблицу</p>`;
    }

    return `
      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>

      <ul class="db__list">
        ${keys.map(this.toHtml).join('')}
      </ul>
    `;
  }

  toHtml(key) {
    const { title, openedDate } = storage(key);
    const date = new Date(openedDate);
    const id = key.replace(':', '/');
    return `
      <li class="db__record">
          <a href="#${id}">${ title }</a>
          <strong>
            ${ date.toLocaleDateString() } - ${ date.toLocaleTimeString() }
          </strong>
        </li>`;
  }
}
