import { Excel } from './components/excel/Excel';
import { Formula, Header, Table, Toolbar } from './components';
import { createStore } from '@core/redux/createStore';
import { rootReducer } from '@/store/rootReducer';

import './scss/index.scss';

const store = createStore(rootReducer);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
});

excel.render();
