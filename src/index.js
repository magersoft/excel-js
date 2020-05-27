import './scss/index.scss';
import { Excel } from './components/excel/Excel';
import { Formula, Header, Table, Toolbar } from './components';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
});

excel.render();
