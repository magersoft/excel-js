import { Excel } from './components/excel/Excel';
import { Formula, Header, Table, Toolbar } from './components';
import { initialState } from '@/store/initialState';
import { createStore } from '@core/redux/createStore';
import { rootReducer } from '@/store/rootReducer';
import { storage, debounce } from '@core/utils';

import './scss/index.scss';
import { defaultDelay } from '@/config';

const store = createStore(rootReducer, initialState);

const stateListener = debounce(state => {
  console.log('App state', state);
  storage('excel-state', state);
}, defaultDelay);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
});

excel.render();
