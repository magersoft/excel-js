import { Page } from '@core/page/Page';
import { createStore } from '@core/redux/createStore';
import { rootReducer } from '@/store/rootReducer';
import { normalizeInitialState } from '@/store/initialState';
import { Excel } from '@/components/excel/Excel';
import { Header, Toolbar, Formula, Table } from '@/components';
import { StateProcessor } from '@core/page/StateProcessor';
import { LocalStorageClient } from '@/clients/LocalStorageClient';

export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.processor = new StateProcessor(
        new LocalStorageClient(this.params)
    );
  }

  async getRoot() {
    const state = await this.processor.get();
    const store = createStore(rootReducer, normalizeInitialState(state));

    this.storeSub = store.subscribe(this.processor.listen);

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
    this.storeSub.unsubscribe();
  }
}
