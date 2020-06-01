import { Excel } from './components/excel/Excel';
import { Formula, Header, Table, Toolbar } from './components';
import { initialState } from '@/store/initialState';
import { createStore } from '@core/redux/createStore';
import { rootReducer } from '@/store/rootReducer';
import { storage } from '@core/utils';

import './scss/index.scss';

const store = createStore(rootReducer, initialState);

store.subscribe(state => {
  storage('excel-state', state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
});

excel.render();
