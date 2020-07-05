import { Page } from '@core/Page';
import { createStore } from '@core/redux/createStore';
import { rootReducer } from '@/store/rootReducer';
import { normalizeInitialState } from '@/store/initialState';
import { debounce, storage } from '@core/utils';
import { defaultDelay } from '@/config';
import { Excel } from '@/components/excel/Excel';
import { Header, Toolbar, Formula, Table } from '@/components';

function storageName(param) {
  return 'excel:' + param;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce(state => {
      console.log('App state', state);
      storage(storageName(params), state);
    }, defaultDelay);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
